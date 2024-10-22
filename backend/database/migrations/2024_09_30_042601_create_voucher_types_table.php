<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('voucher_types', function (Blueprint $table) {
            $table->id('voucher_type_id');
            $table->string('name', 1000);
            $table->integer('discount');
            $table->integer('customer_usage_limit')->default(1); // Số lần tối đa mà một user có thể sử dụng voucher
            $table->string('discount_type');
            $table->integer('min_spend');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher_types');
    }
};
