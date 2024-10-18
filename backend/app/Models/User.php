<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // Kế thừa từ Authenticatable
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject; // Import interface JWTSubject

class User extends Authenticatable implements JWTSubject // Thêm implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = 'users'; // Tên bảng

    protected $primaryKey = 'user_id'; // Khóa chính

    public $timestamps = true; // Sử dụng timestamps

    // Các trường có thể được gán (fillable)
    protected $fillable = [
        'user_name',
        'avatar',
        'email',
        'password',
        'gender',
        'role',
        'google_id',
        'access_token',
        'provider',
        'email_verified_at',
        'email_verification_token'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Nếu bạn muốn ẩn mật khẩu khi trả về thông tin người dùng
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Thêm hai phương thức cần thiết cho JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey(); // Trả về khóa chính của người dùng
    }

    public function getJWTCustomClaims()
    {
        return []; // Trả về một mảng chứa các claim tùy chỉnh (nếu có)
    }
}
