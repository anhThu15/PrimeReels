<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // API đăng nhập
    public function login(Request $request)
    {
        // Validate các thông tin đăng nhập
        $credentials = $request->only('email', 'password');

        // Thực hiện xác thực
        if (!$token = JWTAuth::attempt($credentials)) {
            Log::error('Login failed', $credentials); // Ghi log thông tin đăng nhập
            return response()->json(['error' => 'Thông tin xác thực không hợp lệ'], 401);
        }

        // Lấy thông tin người dùng
        $user = Auth::user();
        Log::info('User logged in', ['user' => $user]);
        // Trả về token JWT và thông tin người dùng
        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $user
        ]);
    }
    // Đăng ký người dùng
    public function register(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'user_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', // Xác thực mật khẩu
            // 'gender' => 'required|in:nam,nu',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Tạo người dùng mới
        $user = User::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            // 'gender' => $request->gender,
            'role' => 0, // Mặc định là người dùng bình thường
            'email_verified_at' => null, // Chưa xác minh
            'email_verification_token' => Str::random(60), // Tạo token xác minh
        ]);

        // Gửi email xác nhận (cần cấu hình mail trước)
        Mail::to($user->email)->send(new \App\Mail\VerifyEmail($user));

        return response()->json(['status' => 'success', 'message' => 'Đăng ký thành công. Vui lòng kiểm tra email để xác minh.']);
    }

    public function verifyEmail($userId, $token)
    {
        $user = User::where('user_id', $userId)->first();

        if (!$user || $user->email_verification_token !== $token) {
            return response()->json(['error' => 'Token xác minh không hợp lệ'], 400);
        }

        $user->email_verified_at = now();
        $user->email_verification_token = null;
        $user->save();

        return response()->json(['status' => 'success', 'message' => 'Xác minh email thành công.']);
    }
    // Phương thức logout
    public function logout(Request $request)
    {
        try {
            // Đánh dấu token hiện tại là đã bị hủy
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json(['message' => 'Đăng xuất thành công']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Đăng xuất thất bại'], 500);
        }
    }
    // Gửi email đặt lại mật khẩu
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'Email không tồn tại.'], 404);
        }

        // Tạo token đặt lại mật khẩu
        $token = Str::random(60);

        // Gửi email đặt lại mật khẩu
        Mail::to($user->email)->send(new \App\Mail\ResetPassword($user, $token));

        return response()->json(['message' => 'Email đặt lại mật khẩu đã được gửi!']);
    }
    // Đặt lại mật khẩu
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Kiểm tra token và email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'Email không tồn tại.'], 404);
        }

        // Đặt lại mật khẩu
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Mật khẩu đã được đặt lại thành công.']);
    }
}
