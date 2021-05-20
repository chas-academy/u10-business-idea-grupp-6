<?php

namespace App\Models;

use App\Events\MatchupSuccessful;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matchup extends Model
{
    use HasFactory;

    protected $hidden = ['users'];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
