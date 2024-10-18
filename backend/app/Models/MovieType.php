<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieType extends Model
{
    use HasFactory;

    protected $table = 'movie_types';
    protected $primaryKey = 'movie_type_id';
    protected $fillable = ['name'];

    // Mối quan hệ với Movie
    public function movies()
    {
        return $this->hasMany(Movie::class, 'movie_type_id', 'movie_type_id');
    }
}
