<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    // API đăng nhập
    public function login(Request $request)
    {
        // Validate các thông tin đăng nhập
        $credentials = $request->only('email', 'password');

        // Thực hiện xác thực
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Thông tin xác thực không hợp lệ'], 401);
        }

        // Lấy thông tin người dùng
        $user = Auth::user();
        // Trả về token JWT và thông tin người dùng
        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'avatar' => 'nullable|file|max:1000',
            'gender' => 'nullable|in:nam,nu',
            'role' => 'nullable|integer',
            'google_id' => 'nullable|string|max:1000',
            'access_token' => 'nullable|string|max:500',
            'provider' => 'nullable|in:local,google',
        ]);

        $user = User::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Mã hóa mật khẩu
            'avatar' => $request->avatar,
            'gender' => $request->gender,
            'role' => $request->role ?? 0, // Gán giá trị mặc định nếu không có
            'google_id' => $request->google_id,
            'access_token' => $request->access_token,
            'provider' => $request->provider ?? 'local', // Gán giá trị mặc định nếu không có
        ]);

        return response()->json($user, 201);
    }

    public function show($user_id)
    {
        return User::findOrFail($user_id);
    }

    public function update(Request $request, $user_id)
    {
        // Tìm kiếm người dùng dựa trên user_id
        $user = User::findOrFail($user_id);

        // Validate các trường cần thiết
        $request->validate([
            'user_name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $user_id . ',user_id',
            'password' => 'nullable|string|min:8',
            'avatar' => 'nullable|string|max:1000',
            'gender' => 'nullable|in:nam,nu',
            'role' => 'nullable|integer',
            'google_id' => 'nullable|string|max:1000',
            'access_token' => 'nullable|string|max:500',
            'provider' => 'nullable|in:local,google',
        ]);

        if ($request->hasFile('avatar')) {
            $validated['avatar'] = $request->file('avatar')->store('images', 'public');
        }
        // Cập nhật các trường nếu có trong request
        $user->update(array_filter($request->except('password')));

        // Nếu mật khẩu được cung cấp, mã hóa và cập nhật
        if ($request->has('password')) {
            $user->password = bcrypt($request->password);
        }

        // Lưu thông tin người dùng (bao gồm thay đổi mật khẩu nếu có)
        $user->save();

        // Trả về thông tin người dùng đã được cập nhật
        return response()->json(['message' => 'Tài khoản cập nhật thành công'], 200);
    }



    public function destroy($user_id)
    {
        $user = User::findOrFail($user_id);
        $user->delete();
        return response()->json(null, 204);
    }
}
