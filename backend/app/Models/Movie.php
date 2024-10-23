<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;
    protected $table = 'movies';
    protected $primaryKey = 'movie_id';
    protected $fillable = [
        'title',
        'avatar',
        'country',
        'director',
        'status',
        'rating',
        'views',
        'duration',
        'description',
        'banner',
        'poster',
        'favorites_count',
        'movie_type_id'
    ];
    public function episode()
    {
        return $this->hasMany(Episode::class, 'movie_id');
    }
    public function movieType()
    {
        return $this->belongsTo(MovieType::class, 'movie_type_id');
    }

    public function actors()
    {
        return $this->belongsToMany(Actor::class, 'movies_actors', 'movie_id', 'actor_id');
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'movies_genres', 'movie_id', 'genre_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'movie_id', 'movie_id');
    }

    public function updateRating()
    {
        $averageRating = $this->comments()->average('rating');
        $this->rating = $averageRating;
        $this->save();
    }
}
