<?php

namespace App\Events;

use App\Http\Resources\UserCollection;
use App\Models\Matchup;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MatchupSuccessful implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */

    public $matchupData;

    public function __construct(Matchup $matchup)
    {
        $this->matchupData = [
            'matchup' => $matchup,
            'users' => new UserCollection($matchup->users) 
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return $this->matchupData['users']
        ->map(fn($u) => 
        new PrivateChannel("App.Models.User.".$u->id))
        ->toArray();
    }
}
