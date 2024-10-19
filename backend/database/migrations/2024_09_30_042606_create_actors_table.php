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
        Schema::create('actors', function (Blueprint $table) {
            $table->id('actor_id');
            $table->string('name', 1000);
            $table->tinyInteger('status');
            $table->text('biography')->nullable();
            $table->dateTime('birth_date')->nullable();
            $table->string('image_url', 1000)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actors');
    }
};
