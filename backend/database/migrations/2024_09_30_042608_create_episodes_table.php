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
        Schema::create('episodes', function (Blueprint $table) {
            $table->id('episode_id');
            $table->tinyInteger('status');
            $table->string('video_url');
            $table->integer('duration');
            $table->dateTime('release_date');
            $table->integer('episode_number');
            $table->unsignedBigInteger('movie_id');
            $table->timestamps();
            $table->foreign('movie_id')->references('movie_id')->on('movies');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('episodes');
    }
};
