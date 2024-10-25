<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $primaryKey = 'episode_id'; 
    public $incrementing = true;          
    protected $keyType = 'int';
    protected $fillable = [
        'episode_id',
        'status',
        'video_url',
        'duration',
        'release_date',
        'episode_number',
        'movie_id'
    ];

    public function movie()
    {
        return $this->belongsTo(Movie::class, 'movie_id');
    }
}
