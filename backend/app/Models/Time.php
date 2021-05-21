<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Time extends Model
{
    use HasFactory;

    protected $fillable = [
        'interval',
        'from',
        'to',
        'available'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
