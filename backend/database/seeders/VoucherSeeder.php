<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VoucherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Dữ liệu mẫu để chèn vào bảng vouchers
        $vouchers = [
            [
                'name' => 'CODE-10%',
                'voucher_type_id' => 1, // Giả sử voucher_type_id = 1 đã tồn tại trong voucher_types
                'voucher_quantity' => 100,
                'expired' => false,
                'enddate' => now()->addDays(30),
                'user_successful_uses' => json_encode([]), // Danh sách người dùng đã sử dụng voucher
            ],
            [
                'name' => 'CODE-50K',
                'voucher_type_id' => 2, // Giả sử voucher_type_id = 2 đã tồn tại
                'voucher_quantity' => 50,
                'expired' => false,
                'enddate' => now()->addDays(60),
                'user_successful_uses' => json_encode([]),
            ],
            [
                'name' => 'CODE-15%',
                'voucher_type_id' => 3, // Giả sử voucher_type_id = 3 đã tồn tại
                'voucher_quantity' => 30,
                'expired' => false,
                'enddate' => now()->addDays(90),
                'user_successful_uses' => json_encode([]),
            ],
        ];

        // Chèn dữ liệu vào bảng vouchers
        DB::table('vouchers')->insert($vouchers);
    }
}
