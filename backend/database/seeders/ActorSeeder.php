<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('actors')->insert([
            [
                'name' => 'Leonardo DiCaprio',
                'status' => 1,
                'biography' => 'An American actor, producer, and environmentalist.',
                'birth_date' => '1974-11-11',
                'image_url' => 'https://example.com/leonardo.jpg',
            ],
            [
                'name' => 'Scarlett Johansson',
                'status' => 1,
                'biography' => 'An American actress and singer.',
                'birth_date' => '1984-11-22',
                'image_url' => 'https://example.com/scarlett.jpg',
            ],
            [
                'name' => 'Morgan Freeman',
                'status' => 1,
                'biography' => 'An American actor, film director, and narrator.',
                'birth_date' => '1937-06-01',
                'image_url' => 'https://example.com/morgan.jpg',
            ],
            // Thêm nhiều diễn viên khác ở đây
        ]);
    }
}
