<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Events\UserCreated;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

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

    /**
     * The events that are dispatched as a result of the model's hooks
     */
    protected $dispatchesEvents = [
        'created' => UserCreated::class
    ];


    //------------------------------------------------------
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

    public function times()
    {
        return $this->hasMany(Time::class);
    }

    public function count_matches(User $user, string $related_table): int
    {
        $a = $user->{$related_table}->pluck('id')->toArray();
        $b = $this->{$related_table}->pluck('id')->toArray();
        
        return count(array_intersect($b, $a));
    }
}
