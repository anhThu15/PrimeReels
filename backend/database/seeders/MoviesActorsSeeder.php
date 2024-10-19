<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MoviesActorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('movies_actors')->insert([
            [
                'movie_id' => 1, // ID của phim
                'actor_id' => 1, // ID của diễn viên
            ],
            [
                'movie_id' => 1,
                'actor_id' => 2,
            ],
            [
                'movie_id' => 2,
                'actor_id' => 1,
            ],
            [
                'movie_id' => 2,
                'actor_id' => 3,
            ],
            // Thêm các bản ghi khác nếu cần
        ]);
    }
}
