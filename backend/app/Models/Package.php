<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    // Khai báo bảng tương ứng
    protected $table = 'packages';
    // Khai báo khóa chính
    protected $primaryKey = 'package_id'; // Khóa chính
    // Khai báo các trường có thể được gán giá trị
    protected $fillable = [
        'name',
        'duration',
        'price',
    ];

    // Quan hệ với bảng invoices
    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'package_id', 'package_id');
    }
}
