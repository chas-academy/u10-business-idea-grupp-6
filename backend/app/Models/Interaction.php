<?php

namespace App\Models;

use App\Events\InteractionOccurance;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interaction extends Model
{
    use HasFactory;


    protected $dispatchesEvents = [
        'created' => InteractionOccurance::class
    ];

    public function subject_user()
    {
        return $this->belongsTo(User::class, 'subject_user_id');
    }

    public function object_user()
    {
        return $this->belongsTo(User::class, 'object_user_id');
    }
}
