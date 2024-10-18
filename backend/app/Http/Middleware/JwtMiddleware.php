<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class JwtMiddleware
{
    public function handle($request, Closure $next)
    {
        try {
            // Kiểm tra và xác thực token
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['error' => 'Không tìm thấy người dùng'], 404);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token không hợp lệ'], 401);
        }

        // Gắn thông tin người dùng vào request
        $request->auth = $user;

        return $next($request);
    }
}

