<?php

namespace App\Listeners;

use App\Events\InteractionOccurance;
use App\Models\UserMatch;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CheckInteractionMatch
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
     * @param  InteractionOccurance  $event
     * @return void
     */
    public function handle(InteractionOccurance $event)
    {
        $interaction = $event->interaction;

        if ($interaction->likes && $interaction->object_user
            ->subject_interactions()
            ->where('object_user_id', $interaction->subject_user_id)
            ->where('likes', true)
            ->first()
            ->count() > 0)
                UserMatch::create([
                    'user_a_id' => $interaction->subject_user_id,
                    'user_b_id' => $interaction->object_user_id
                ]);
    }
}
