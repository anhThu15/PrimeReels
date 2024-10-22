<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Dữ liệu mẫu để chèn vào bảng packages
        $packages = [
            [
                'name' => 'Basic',
                'duration' => 1,
                'price' => 10000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Standard',
                'duration' => 30,
                'price' => 299999,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Premium',
                'duration' => 365,
                'price' => 2999999,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Chèn dữ liệu vào bảng packages
        DB::table('packages')->insert($packages);
    }
}
