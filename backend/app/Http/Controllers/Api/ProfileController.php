<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    // API lấy thông tin profile của người dùng
    public function profile(Request $request)
    {
        // Lấy thông tin người dùng đã đăng nhập
        $user = Auth::user();

        // Kiểm tra xem người dùng có tồn tại không
        if (!$user) {
            return response()->json(['error' => 'Người dùng không tìm thấy'], 404);
        }

        // Trả về thông tin profile của người dùng
        return response()->json([
            'status' => 'success',
            'user' => $user
        ]);
    }

    // API cập nhật thông tin cá nhân của người dùng
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Người dùng không tìm thấy'], 404);
        }
        // dd($user);
        $validator = Validator::make($request->all(), [
            'user_name' => 'string|max:255',
            'avatar' => 'string',
            'gender' => 'sometimes|string|in:nam,nu',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Cập nhật thông tin người dùng
        $user->update($request->only('user_name', 'avatar', 'gender'));


        return response()->json(['status' => 'success', 'message' => 'Cập nhật thông tin cá nhân thành công']);
    }

    // API đổi mật khẩu người dùng
    public function changePassword(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Người dùng không tìm thấy'], 404);
        }

        // Xác thực đầu vào
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string|min:8',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Kiểm tra mật khẩu hiện tại
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Mật khẩu hiện tại không chính xác'], 400);
        }

        // Cập nhật mật khẩu mới
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['status' => 'success', 'message' => 'Đổi mật khẩu thành công']);
    }
}
