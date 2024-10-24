<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Invoice;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function getStatistics()
    {
        // Tổng doanh thu chỉ tính các hóa đơn có status 'success'
        $totalRevenue = Invoice::where('status', 'success')->sum('total');

        // Tổng số hóa đơn
        $totalInvoices = Invoice::count();

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
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('SUM(total) as total'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->get();

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
            'successful_invoices' => $successfulInvoices,
            'average_revenue' => $formattedAverageRevenue,
            'invoice_status_stats' => $invoiceStatusStats,
            'monthly_revenue' => $formattedMonthlyRevenue
        ]);
    }
}
