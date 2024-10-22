<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VoucherTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Dữ liệu mẫu để chèn vào bảng voucher_types
        $voucherTypes = [
            [
                'name' => 'Voucher Giảm Giá 10%',
                'discount' => 20, // Giảm 20%
                'customer_usage_limit' => 1,
                'discount_type' => 'percentage',
                'min_spend' => 100000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Voucher Giảm 50.000 VNĐ',
                'discount' => 50000, // Giảm 50.000 VNĐ
                'customer_usage_limit' => 1,
                'discount_type' => 'fixed',
                'min_spend' => 50000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Voucher Giảm Giá Đơn Hàng Lớn',
                'discount' => 15, // Giảm 15%
                'customer_usage_limit' => 1,
                'discount_type' => 'percentage',
                'min_spend' => 200000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Chèn dữ liệu vào bảng voucher_types
        DB::table('voucher_types')->insert($voucherTypes);
    }
}
