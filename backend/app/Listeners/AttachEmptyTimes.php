<?php

namespace App\Listeners;

use App\Events\UserCreated;
use App\Models\Time;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AttachEmptyTimes
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserCreated  $event
     * @return void
     */
    public function handle(UserCreated $event)
    {
        $user = $event->user;

        $user->times()->createMany([
                [
                    'interval' => 'weekday',
                ],[
                    'interval' => 'weekend'
                ]
            ]);
    }
}
