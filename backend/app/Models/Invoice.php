<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    // Khai báo bảng tương ứng
    protected $table = 'invoices';
    protected $primaryKey = 'invoice_id'; // Khóa chính
    // Thêm thuộc tính này để tắt tính năng timestamps
    public $timestamps = false;

    // Khai báo các trường có thể được gán giá trị
    protected $fillable = [
        'invoice_code',
        'total',
        'payment_method',
        'user_id',
        'created_at',
        'start_date',
        'end_date',
        'voucher_id',
        'status',
    ];

    // Quan hệ với model User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    // Quan hệ với model Package
    public function package()
    {
        return $this->belongsTo(Package::class, 'package_id');
    }

    // Quan hệ với model Voucher (nếu có)
    public function voucher()
    {
        return $this->belongsTo(Voucher::class, 'voucher_id');
    }
}
