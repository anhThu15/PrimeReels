<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    protected $table = 'Genres';
    protected $primaryKey = 'genre_id';
    public $timestamps = false;
    protected $fillable = [
        'name',
        'status',
        'description'
    ];

    public function movies()
    {
        return $this->belongsToMany(Movie::class, 'movies_genres', 'genre_id', 'movie_id');
    }
}
