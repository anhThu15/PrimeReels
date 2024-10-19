<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra xem người dùng đã đăng nhập và có vai trò admin
        if (Auth::check() && Auth::user()->role == 100) { //  100 là vai trò admin
            return $next($request);
        }

        return response()->json(['error' => 'Bạn không có quyền truy cập'], 403);
    }
}
