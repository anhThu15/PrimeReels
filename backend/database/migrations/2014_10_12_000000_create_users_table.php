<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id'); // user_id: int(11)
            $table->string('user_name', 255)->nullable(); // user_name: varchar(255)
            $table->string('avatar', 1000)->nullable(); // avatar: varchar(1000)
            $table->string('email', 255)->unique(); // email: varchar(255)
            $table->string('password', 1000); // password: varchar(1000)
            $table->enum('gender', ['nam', 'nu'])->nullable(); // gender: enum('nam', 'nu')
            $table->tinyInteger('role')->default(0); // role: tinyint(0)
            $table->string('google_id', 1000)->nullable(); // google_id: varchar(1000)
            $table->string('access_token', 500)->nullable(); // access_token: varchar(500)
            $table->enum('provider', ['local', 'google'])->default('local'); // provider: enum('local', 'google')
             // Thêm các trường email_verified_at và email_verification_token
            $table->timestamp('email_verified_at')->nullable(); // email_verified_at: timestamp
            $table->string('email_verification_token', 60)->nullable(); // email_verification_token: varchar(60)
            $table->timestamps(); // created_at and updated_at
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('email_verified_at');
            $table->dropColumn('email_verification_token');
        });
    }
}

