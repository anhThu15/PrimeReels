<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\Movie;
use App\Models\MovieType;
use App\Models\Genre;
use App\Models\User;
use App\Models\Voucher;
use App\Models\Comment;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function getStatistics()
    {
        // Tổng doanh thu chỉ tính các hóa đơn có status 'success'
        $totalRevenue = Invoice::where('status', 'success')->sum('total');

        // Tổng số hóa đơn
        $totalInvoices = Invoice::count();

        // Tổng số Phim
        $totalMovie = Movie::count();

        // Tổng số Danh mục
        $totalMovieType = MovieType::count();

        // Tổng số Thể loại
        $totalGenre = Genre::count();

        // Tổng số Thể loại
        $totalVoucher = Voucher::count();

        // Tổng số ng dùng
        $totalUser = User::where('role', '0')->count();


        // Số hóa đơn có trạng thái 'success'
        $successfulInvoices = Invoice::where('status', 'success')->count();

        // Doanh thu trung bình (chỉ các hóa đơn 'success')
        $averageRevenue = Invoice::where('status', 'success')->avg('total');

        // Thống kê số hóa đơn theo từng trạng thái
        $invoiceStatusStats = Invoice::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();

        // Doanh thu theo từng tháng (chỉ tính các hóa đơn 'success')
        $monthlyRevenue = Invoice::where('status', 'success')
            ->select(DB::raw('YEAR(created_at) as year'),DB::raw('MONTH(created_at) as month'), DB::raw('SUM(total) as total'))
            ->groupBy(DB::raw('YEAR(created_at)'),DB::raw('MONTH(created_at)'))
            ->get()
            ->map(function ($item) {
                $item->year = 'Năm ' . $item->year; 
                $item->month = 'Tháng ' . $item->month; 
                return $item;
            });

        // Số lượng theo từng tháng (chỉ tính các ng dùng  '0')
        $monthlyUser = User::where('role', '0')
        ->select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as user')
        )
        ->groupBy(DB::raw('YEAR(created_at)'),DB::raw('MONTH(created_at)'))
        ->get()
        ->map(function ($item) {
            $item->year = 'Năm ' . $item->year; 
            $item->month = 'Tháng ' . $item->month; 
            return $item;
        });

        // Số lượng comment theo từng tháng 
        $monthlyComment = Comment::select(
            DB::raw('YEAR(created_at) as year'),
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as comment')
        )
        ->groupBy(
            DB::raw('YEAR(created_at)'),
            DB::raw('MONTH(created_at)'))
        ->get()
        ->map(function ($item) {
            $item->year = 'Năm ' . $item->year; 
            $item->month = 'Tháng ' . $item->month; 
            return $item;
        });
        // Số lượng voucher được dùng theo từng tháng 
        $monthlyvoucher = Invoice::where('voucher_id','>', '0')
        ->select(DB::raw('YEAR(created_at) as year'),DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as invoice'))
        ->groupBy(DB::raw('YEAR(created_at)'),DB::raw('MONTH(created_at)'))
        ->get()
        ->map(function ($item) {
            $item->year = 'Năm ' . $item->year; 
            $item->month = 'Tháng ' . $item->month; 
            return $item;
        });


        // Định dạng các giá trị tiền tệ thành dạng VND với dấu phân cách hàng nghìn
        $formattedTotalRevenue = number_format($totalRevenue, 0, ',', '.') . ' VND';
        $formattedAverageRevenue = number_format($averageRevenue, 0, ',', '.') . ' VND';

        // Định dạng doanh thu theo từng tháng
        $formattedMonthlyRevenue = $monthlyRevenue->map(function ($item) {
            $item->total = number_format($item->total, 0, ',', '.') . ' VND';
            return $item;
        });

        // Trả về kết quả thống kê dưới dạng JSON
        return response()->json([
            'total_revenue' => $formattedTotalRevenue,
            'total_invoices' => $totalInvoices,
            'total_Movie' => $totalMovie,
            'total_MovieType' => $totalMovieType,
            'total_Genre' => $totalGenre,
            'total_User' => $totalUser,
            'total_Voucher' => $totalVoucher,
            'successful_invoices' => $successfulInvoices,
            'average_revenue' => $formattedAverageRevenue,
            'invoice_status_stats' => $invoiceStatusStats,
            'monthly_revenue' => $formattedMonthlyRevenue,
            'monthly_user' => $monthlyUser,
            'monthly_Comment' => $monthlyComment,
            'monthly_Voucherused' => $monthlyvoucher
        ]);
    }




    // // CONTROLLER HÓA ĐƠN // //

    // Lấy tất cả hóa đơn
    public function index(Request $request)
    {
        // Lấy từ khóa từ request
        $keyword = $request->input('keyword');

        // Lấy tất cả hóa đơn
        $invoices = Invoice::with(['user', 'voucher', 'package']);

        if ($keyword) {
            // Tìm kiếm theo invoice_code, payment_method, và status
            $invoices->where(function ($query) use ($keyword) {
                $query->where('invoice_code', 'LIKE', "%{$keyword}%")
                    ->orWhere('payment_method', 'LIKE', "%{$keyword}%")
                    ->orWhere('status', 'LIKE', "%{$keyword}%");
            });
        }

        return response()->json($invoices->get());
        }

    // Lấy chi tiết hóa đơn theo ID
    public function show($id)
    {
        $invoice = Invoice::with(['user', 'voucher', 'voucher.voucherType','package'])->find($id); 
        if ($invoice) {
            return response()->json($invoice);
        }
        return response()->json(['message' => 'Không tìm thấy hóa đơn!'], 404);
    }
}
