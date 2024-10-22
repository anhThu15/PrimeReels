<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;

    // Khai báo bảng tương ứng
    protected $table = 'vouchers';

    protected $primaryKey = 'voucher_id';

    public $timestamps = false;

    // Khai báo các trường có thể được gán giá trị
    protected $fillable = [
        'name',
        'voucher_type_id',
        'voucher_quantity',
        'expired',
        'enddate',
        'user_successful_uses',
    ];

    // Tự động cast trường user_successful_uses sang dạng mảng
    protected $casts = [
        'user_successful_uses' => 'array',
    ];

    // Quan hệ với model VoucherType
    public function voucherType()
    {
        return $this->belongsTo(VoucherType::class, 'voucher_type_id');
    }

    // Quan hệ với model Invoice (nếu có)
    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
}
