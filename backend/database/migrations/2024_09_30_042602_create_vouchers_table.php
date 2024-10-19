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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id('voucher_id');
            $table->string('name', 1000);
            $table->unsignedBigInteger('voucher_type_id');
            $table->integer('voucher_quantity');
            $table->boolean('expired')->default(false);
            $table->dateTime('enddate');
            $table->json('user_successful_uses')->nullable();
            $table->foreign('voucher_type_id')->references('voucher_type_id')->on('voucher_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
