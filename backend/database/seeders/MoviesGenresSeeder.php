<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MoviesGenresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('movies_genres')->insert([
            [
                'movie_id' => 1, // ID của phim
                'genre_id' => 1, // ID của thể loại
            ],
            [
                'movie_id' => 1,
                'genre_id' => 2,
            ],
            [
                'movie_id' => 2,
                'genre_id' => 1,
            ],
            [
                'movie_id' => 2,
                'genre_id' => 3,
            ],
            // Thêm các bản ghi khác nếu cần
        ]);
    }
}
