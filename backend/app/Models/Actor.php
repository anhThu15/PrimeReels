<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    use HasFactory;

    protected $table = 'actors';
    protected $primaryKey = 'actor_id';
    public $timestamps = false;
    protected $fillable = [
        'name',
        'status',
        'biography',
        'birth_date',
        'image_url'
    ];

    public function movies()
    {
        return $this->belongsToMany(Movie::class, 'movies_actors', 'actor_id', 'movie_id');
    }
}
