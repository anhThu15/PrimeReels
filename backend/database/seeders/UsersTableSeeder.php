<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Tạo 10 người dùng giả định
         for ($i = 0; $i < 10; $i++) {
            DB::table('users')->insert([
                'user_name' => 'User ' . ($i + 1),
                'avatar' => 'https://example.com/avatar' . ($i + 1) . '.png',
                'email' => 'user' . ($i + 1) . '@example.com',
                'password' => bcrypt('password'), // Mã hóa mật khẩu
                'gender' => ($i % 2 == 0) ? 'nam' : 'nu', // Chọn ngẫu nhiên giới tính
                'role' => '0', // Chọn ngẫu nhiên vai trò
                'google_id' => null, // Giá trị mặc định
                'access_token' => null, // Giá trị mặc định
                'provider' => 'local', // Giá trị mặc định
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
