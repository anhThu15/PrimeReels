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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id('invoice_id');
            $table->string('invoice_code', 20);
            $table->integer('total');
            $table->string('payment_method', 50);
            $table->unsignedBigInteger('user_id');
            $table->dateTime('created_at');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->unsignedBigInteger('voucher_id')->nullable();
            $table->string('status')->default('pending');
            $table->unsignedBigInteger('package_id');
            $table->foreign('package_id')->references('id')->on('packages');
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->foreign('voucher_id')->references('voucher_id')->on('vouchers');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
