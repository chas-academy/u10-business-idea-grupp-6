<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'game'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }
}
