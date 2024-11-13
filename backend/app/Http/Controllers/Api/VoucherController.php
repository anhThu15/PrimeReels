<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Voucher;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    public function index()
    {
        return response()->json(Voucher::with('voucherType')->get());
    }

    public function show($id)
    {
        $voucher = Voucher::with('voucherType')->find($id);
        return $voucher ? response()->json($voucher) : response()->json(['message' => 'Voucher not found!'], 404);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:1000',
            'voucher_type_id' => 'required|exists:voucher_types,voucher_type_id',
            'voucher_quantity' => 'required|integer|min:1',
            'enddate' => 'required|date|after_or_equal:now',
        ]);

        // Tạo voucher mới
        $voucher = Voucher::create([
            'name' => $request->name,
            'voucher_type_id' => $request->voucher_type_id,
            'voucher_quantity' => $request->voucher_quantity,
            'expired' => false, // Đặt giá trị mặc định cho expired (0 vs 1)
            'enddate' => $request->enddate,
        ]);

        return response()->json($voucher, 201);
    }

    public function update(Request $request, $id)
    {
        // Tìm voucher theo ID
        $voucher = Voucher::find($id);
        if ($voucher) {
            // Xác thực các trường trong request
            $request->validate([
                'name' => 'sometimes|string|max:1000',
                'voucher_type_id' => 'sometimes|exists:voucher_types,voucher_type_id',
                'voucher_quantity' => 'sometimes|integer|min:0',
                'expired' => 'sometimes|boolean', // Thay đổi xác thực cho expired
                'enddate' => 'sometimes|date|after_or_equal:expired',
            ]);

            // Cập nhật các trường cần thiết
            $voucher->fill($request->only(['name', 'voucher_type_id', 'voucher_quantity', 'expired', 'enddate']));

            // Kiểm tra nếu expired có được cập nhật hay không
            if ($request->has('expired')) {
                $voucher->expired = $request->input('expired'); // Đảm bảo cập nhật đúng giá trị boolean
            }

            $voucher->save(); 

            return response()->json($voucher);
        }
        return response()->json(['message' => 'Mã giảm giá không tồn tại'], 404);
    }

    public function destroy($id)
    {
        $voucher = Voucher::find($id);
        if ($voucher) {
            $voucher->delete();
            return response()->json(['message' => 'Mã giảm giá đã xoá thành công']);
        }
        return response()->json(['message' => 'Mã giảm giá không tồn tại'], 404);
    }
}
