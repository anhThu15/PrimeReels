<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoucherType extends Model
{
    use HasFactory;

    // Khai báo bảng tương ứng
    protected $table = 'voucher_types';

    protected $primaryKey = 'voucher_type_id'; // Khóa chính

    public $timestamps = true;

    // Khai báo các trường có thể được gán giá trị
    protected $fillable = [
        'name',
        'discount',
        'customer_usage_limit',
        'discount_type',
        'min_spend',
    ];

    // Quan hệ với model Voucher
    public function vouchers()
    {
        return $this->hasMany(Voucher::class, 'voucher_type_id');
    }
}
