<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('genres')->insert([
            [
                'name' => 'Action',
                'status' => 1,
                'description' => 'Movies that feature physical feats and stunts.',
            ],
            [
                'name' => 'Drama',
                'status' => 1,
                'description' => 'Movies that focus on emotional themes and character development.',
            ],
            [
                'name' => 'Comedy',
                'status' => 1,
                'description' => 'Movies designed to amuse and entertain.',
            ],
            [
                'name' => 'Horror',
                'status' => 1,
                'description' => 'Movies intended to frighten and evoke fear.',
            ],
            [
                'name' => 'Sci-Fi',
                'status' => 1,
                'description' => 'Movies that explore futuristic and imaginative concepts.',
            ],
            // Thêm nhiều thể loại khác ở đây
        ]);
    }
}
