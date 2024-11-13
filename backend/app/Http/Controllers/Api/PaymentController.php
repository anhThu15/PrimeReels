<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Invoice;
use App\Models\Package;
use App\Models\Voucher; // Import Voucher model
use App\Mail\InvoiceMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    // Hàm tạo hóa đơn thanh toán
    public function createPayment(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'package_id' => 'required|exists:packages,package_id',
            'voucher_name' => 'nullable|exists:vouchers,name',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $userId = auth()->user()->user_id; // Lấy ID người dùng đã đăng nhập
        $packageId = $request->package_id; // Lấy package_id từ input
        $package = Package::find($packageId); // Tìm package bằng packageId

        // Tạo mã hóa đơn với một số ngẫu nhiên
        $invoiceCode = 'INV-' . mt_rand(10000000, 99999999); // Tạo số ngẫu nhiên từ 8 chữ số

        // Tính toán giá trị giảm giá
        $discount = 0; // Giá trị giảm giá
        $voucherId = null; // Khởi tạo voucherId
        if ($request->voucher_name) {
            $voucher = Voucher::where('name', $request->voucher_name)->first();

            if ($voucher) {
                // Kiểm tra nếu voucher đã hết hạn
                $currentDate = now();

                if ($voucher->expired || $currentDate->greaterThan($voucher->enddate)) {
                    return response()->json(['message' => 'Mã giảm giá đã hết hạn.'], 400);
                }

                $voucherType = $voucher->voucherType;
                $voucherId = $voucher->voucher_id;

                // Kiểm tra số lượng voucher còn lại
                if ($voucher->voucher_quantity <= 0) {
                    return response()->json(['message' => 'Phiếu quà tặng không còn tồn tại.'], 400);
                }

                // Lấy danh sách user_id đã sử dụng thành công voucher từ JSON
                $successfulUsers = $voucher->user_successful_uses ?? [];

                // Kiểm tra xem người dùng đã sử dụng voucher thành công trước đó hay chưa
                if (in_array($userId, $successfulUsers)) {
                    return response()->json(['message' => 'Bạn đã sử dụng voucher này rồi.'], 400);
                }

                // Kiểm tra chi tiêu tối thiểu
                if ($package->price >= $voucherType->min_spend) {
                    if ($voucherType->discount_type === 'percentage') {
                        $discount = ($package->price * $voucherType->discount) / 100;
                    } elseif ($voucherType->discount_type === 'fixed') {
                        $discount = $voucherType->discount;
                    }
                } else {
                    return response()->json(['message' => 'Giá gói không đáp ứng mức chi tiêu tối thiểu cho voucher này.'], 400);
                }
            } else {
                return response()->json(['message' => 'Voucher không tồn tại.'], 404);
            }
        }

        // Tính tổng sau khi giảm giá
        $total = max($package->price - $discount, 0); // Đảm bảo tổng không âm

        // Tạo hóa đơn
        $invoice = Invoice::create([
            'invoice_code' => $invoiceCode,
            'total' => $total * 100, // VNPay yêu cầu số tiền là VND
            'payment_method' => 'VNPay',
            'user_id' => $userId,
            'created_at' => now(),
            'start_date' => now(),
            'end_date' => now()->addDays($package->duration),
            'voucher_id' => $voucherId, // Lưu voucher_id nếu có
            'status' => 'pending', // Trạng thái ban đầu
            'package_id' => $packageId
        ]);

        // Thông tin kết nối VNPay
        $vnp_TmnCode = env('VNP_TMNCODE');
        $vnp_HashSecret = env('VNP_HASHSECRET');
        $vnp_Url = env('VNP_URL'); // URL của VNPay
        $vnp_Returnurl = route('payment.return'); // Đường dẫn quay lại

        // Thông tin thanh toán
        $vnp_Data = [
            "vnp_Version" => "2.1.0",
            "vnp_Command" => "pay",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $total * 100, // VNPay yêu cầu số tiền là VND
            "vnp_CurrCode" => "VND",
            "vnp_BankCode" => "VNPAY",
            "vnp_Locale" => "vn",
            "vnp_OrderInfo" => "Thanh toán hóa đơn: " . $invoiceCode,
            "vnp_OrderType" => "billpayment",
            "vnp_IpAddr" => request()->ip(),
            "vnp_CreateDate" => now()->format('YmdHis'),
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $invoice->invoice_code, // mã hóa đơn
        ];

        // Tạo mã bảo mật
        ksort($vnp_Data);
        $queryString = http_build_query($vnp_Data);
        $vnp_SecureHash = hash_hmac('sha512', $queryString, $vnp_HashSecret);
        $vnp_Data['vnp_SecureHash'] = $vnp_SecureHash;

        // Chuyển hướng đến VNPay
        $vnp_Url .= "?" . http_build_query($vnp_Data);
        return response()->json(['url' => $vnp_Url]);
    }


    // Hàm nhận kết quả từ VNPay
    public function paymentReturn(Request $request)
    {
        $vnp_SecureHash = $request->get('vnp_SecureHash');
        unset($request['vnp_SecureHash']);

        // Lưu vào một biến
        $requestData = $request->all();

        // Sắp xếp mảng
        ksort($requestData);

        // Tạo chuỗi truy vấn
        $queryString = http_build_query($requestData);
        $vnp_HashSecret = env('VNP_HASHSECRET');
        $secureHash = hash_hmac('sha512', $queryString, $vnp_HashSecret);

        if ($vnp_SecureHash === $secureHash) {
            // Xử lý kết quả thanh toán thành công
            $invoiceCode = $request->get('vnp_TxnRef'); // Lấy mã hóa đơn từ VNPay trả về
            $invoice = Invoice::where('invoice_code', $invoiceCode)->first(); // Tìm hóa đơn dựa trên invoice_code

            if ($invoice) {
                // Lấy số tiền thanh toán từ VNPay
                $amountPaid = $request->get('vnp_Amount') / 100; // VNPay trả về số tiền là VND, chia cho 100 để chuyển sang số nguyên
                if ($request->get('vnp_ResponseCode') === '00') {
                    // Thanh toán thành công
                    $invoice->status = 'success'; // Cập nhật trạng thái
                    $invoice->total = $amountPaid; // Cập nhật số tiền đã thanh toán
                    $invoice->save(); // Lưu trạng thái hóa đơn

                    // Chỉ trừ số lượng voucher nếu thanh toán thành công
                    if ($invoice->voucher_id) {
                        $voucher = Voucher::find($invoice->voucher_id);

                        if ($voucher && $voucher->voucher_quantity > 0) {
                            $voucher->voucher_quantity -= 1;

                            // Lấy danh sách user đã sử dụng thành công từ JSON
                            $successfulUsers = $voucher->user_successful_uses ?? [];
                            $successfulUsers[] = $invoice->user_id; // Thêm user_id vào danh sách

                            $voucher->user_successful_uses = $successfulUsers; // Lưu lại danh sách
                            $voucher->save();
                        } else {
                            return response()->json(['message' => 'Phiếu quà tặng không còn tồn tại.'], 400);
                        }
                    }

                    // Lấy thông tin người dùng từ invoice
                    $user = $invoice->user; // Giả sử Invoice có quan hệ 'user'

                    if ($user) {
                        // Gửi email hóa đơn
                        Mail::to($user->email)->send(new InvoiceMail($invoice)); // Giả sử bạn đã tạo mail InvoiceMail

                        return response()->json([
                            'message' => 'Trạng thái hóa đơn được cập nhật thành công và gửi email!',
                            'invoice_code' => $invoiceCode,
                            'user_email' => $user->email
                        ]);
                    } else {
                        return response()->json(['message' => 'Không tìm thấy người dùng cho hóa đơn này!'], 404);
                    }
                } else {
                    // Thanh toán thất bại
                    $invoice->status = 'fail'; // Cập nhật trạng thái
                    $invoice->save(); // Lưu trạng thái hóa đơn
                    return response()->json(['message' => 'Thanh toán không thành công!', 'invoice_code' => $invoiceCode]);
                }
            } else {
                return response()->json(['message' => 'Không tìm thấy hóa đơn!'], 404);
            }
        } else {
            return response()->json(['message' => 'Mã bảo mật không hợp lệ!'], 400);
        }
    }
}