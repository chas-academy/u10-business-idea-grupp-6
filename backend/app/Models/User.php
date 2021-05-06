<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Events\UserCreated;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'timezone_offset'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $dispatchesEvents = [
        'created' => UserCreated::class
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function games()
    {
        return $this->belongsToMany(Game::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }

    public function player_types()
    {
        return $this->belongsToMany(PlayerType::class);
    }

    public function langs()
    {
        return $this->belongsToMany(Lang::class);
    }

    public function miscs()
    {
        return $this->belongsToMany(Misc::class);
    }
}
