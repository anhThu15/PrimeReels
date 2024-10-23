<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('movies')->insert([
            [
                'title' => 'The Shawshank Redemption',
                'avatar' => 'https://example.com/avatar1.jpg',
                'country' => 'USA',
                'director' => 'Frank Darabont',
                'status' => 1,
                'rating' => 5,
                'views' => 1200000,
                'duration' => 142,
                'description' => 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                'banner' => 'https://example.com/banner1.jpg',
                'poster' => 'https://example.com/poster1.jpg',
                'favorites_count' => 500,
                'movie_type_id' => 1, // Giả sử có loại phim với ID 1
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'The Godfather',
                'avatar' => 'https://example.com/avatar2.jpg',
                'country' => 'USA',
                'director' => 'Francis Ford Coppola',
                'status' => 1,
                'rating' => 5,
                'views' => 1500000,
                'duration' => 175,
                'description' => 'An organized crime dynasty’s aging patriarch transfers control of his clandestine empire to his reluctant son.',
                'banner' => 'https://example.com/banner2.jpg',
                'poster' => 'https://example.com/poster2.jpg',
                'favorites_count' => 600,
                'movie_type_id' => 1, // Giả sử có loại phim với ID 1
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Thêm nhiều bộ phim khác ở đây
        ]);
    }
}
