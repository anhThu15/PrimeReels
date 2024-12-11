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
        // Validate thông tin đăng nhập
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Thông tin xác thực không hợp lệ'], 401);
        }

        // Lấy thông tin người dùng
        $user = Auth::user();

        // Kiểm tra nếu người dùng chưa xác minh email
        if ($user->role == 3) {
            // Gửi lại email xác nhận
            Mail::to($user->email)->send(new \App\Mail\VerifyEmail($user));
            return response()->json(['error' => 'Bạn chưa xác nhận email. Vui lòng kiểm tra email của bạn để xác minh.']);
        }

        // Đăng nhập thành công
        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $user
        ]);
    }
        //API lấy thông tin người dùng theo token
        public function getUser(Request $request)
        {
            try {
                // Xác thực và lấy người dùng từ token
                $user = Auth::user(); // Auth::user() hoạt động nhờ middleware JWT
                return response()->json(['user' => $user], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        }
    // Đăng ký người dùng
    public function register(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'user_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Tạo người dùng với role = 3 (chưa xác minh)
        $user = User::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'gender' => $request->gender,
            'role' => 3, // Người dùng chưa xác minh email
            'email_verified_at' => null,
            'email_verification_token' => Str::random(60),
        ]);

        // Gửi email xác nhận
        Mail::to($user->email)->send(new \App\Mail\VerifyEmail($user));

        return response()->json(['status' => 'success', 'message' => 'Đăng ký thành công. Vui lòng kiểm tra email để xác minh.']);
    }


    public function verifyEmail($userId, $token)
    {
        $user = User::where('user_id', $userId)->first();

        if (!$user || $user->email_verification_token !== $token) {
            return response()->json(['error' => 'Token xác minh không hợp lệ'], 400);
        }

        // Xác minh email thành công, cập nhật role và email_verified_at
        $user->email_verified_at = now();
        $user->email_verification_token = null;
        $user->role = 0; // Vai trò người dùng thông thường sau khi xác minh
        $user->save();

        // Xác minh email thành công duyệt đăng nhập
        $token = JWTAuth::fromUser($user);
        return redirect('http://localhost:3000//login')->with('status', 'Xác minh email thành công. Bạn có thể đăng nhập.');

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