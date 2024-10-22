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
        Schema::create('histories', function (Blueprint $table) {
            $table->id('history_id');
            $table->dateTime('watched_at');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('episode_id');
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->foreign('episode_id')->references('episode_id')->on('episodes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('histories');
    }
};
