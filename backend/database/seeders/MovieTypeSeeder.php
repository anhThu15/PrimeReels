<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MovieTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('movie_types')->insert([
            ['name' => 'Phim Bộ'],
            ['name' => 'Phim Lẻ'],
        ]);
    }
}
