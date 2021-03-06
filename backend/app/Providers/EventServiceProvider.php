<?php

namespace App\Providers;

use App\Events\InteractionOccurance;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\UserCreated;
use App\Listeners\AssignDefaultRole;
use App\Listeners\CheckInteractionMatch;
use App\Listeners\AttachEmptyTimes;
use App\Listeners\CreateProfile;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        UserCreated::class => [
            AssignDefaultRole::class,
            CreateProfile::class,
            AttachEmptyTimes::class
        ],
        InteractionOccurance::class => [
            CheckInteractionMatch::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
