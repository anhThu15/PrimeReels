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
        Schema::create('movies', function (Blueprint $table) {
            $table->id('movie_id');
            $table->string('title');
            $table->string('avatar', 1000)->nullable();
            $table->string('country', 100);
            $table->string('director', 100);
            $table->tinyInteger('status');
            $table->decimal('rating', 3, 2);
            $table->integer('views')->default(0);
            $table->integer('duration');
            $table->text('description')->nullable();
            $table->timestamps();
            $table->string('banner', 1000)->nullable();
            $table->string('poster', 1000)->nullable();
            $table->integer('favorites_count')->default(0);
            $table->unsignedBigInteger('movie_type_id');
            $table->foreign('movie_type_id')->references('movie_type_id')->on('movie_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
