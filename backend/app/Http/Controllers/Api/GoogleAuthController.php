<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GoogleAuthController extends Controller
{
    // Chuyển hướng người dùng đến Google
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    // Xử lý callback từ Google
    public function handleGoogleCallback()
    {
        try {
            // Lấy thông tin người dùng từ Google
            $googleUser = Socialite::driver('google')->user();

            // Kiểm tra người dùng bằng google_id hoặc email
            $user = User::where('google_id', $googleUser->getId())
                ->orWhere('email', $googleUser->getEmail())
                ->first();

            if (!$user) {
                // Nếu không tìm thấy, tạo lại tài khoản người dùng
                $user = User::create([
                    'user_name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'avatar' => $googleUser->getAvatar(),
                    'google_id' => $googleUser->getId(),
                    'provider' => 'google',
                    'role' => 0, // Mặc định là người dùng bình thường
                    'password' => null, // Không cần mật khẩu
                    'email_verified_at' => now(), // Đã xác minh email
                ]);
            } else {
                // Nếu đã tồn tại tài khoản nhưng bị xóa, cập nhật thông tin google_id
                $user->update([
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'provider' => 'google',
                ]);
            }

            // Tạo token JWT cho người dùng
            $token = JWTAuth::fromUser($user);

            // Trả về token và thông tin người dùng
            return response()->json([
                'status' => 'success',
                'token' => $token,
                'user' => $user
            ]);
        } catch (\Exception $e) {
            // dd($e->getMessage());
            return response()->json(['error' => 'Đăng nhập Google thất bại.'], 500);
        }
    }
}