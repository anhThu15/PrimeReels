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
        Schema::create('comments', function (Blueprint $table) {
            $table->id('comment_id');
            $table->string('content', 1000);
            $table->integer('rating');
            $table->tinyInteger('status')->default(1);
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('movie_id');
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->foreign('movie_id')->references('movie_id')->on('movies');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
