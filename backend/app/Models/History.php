<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;

    protected $table = 'histories';
    protected $primaryKey = 'history_id';
    public $timestamps = false;
    protected $fillable = [
        'watched_at',
        'user_id',
        'episode_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function episode()
    {
        return $this->belongsTo(Episode::class, 'episode_id');
    }
}
