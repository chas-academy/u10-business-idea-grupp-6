<?php

namespace App\Http\Resources;

use App\Models\Session;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'profile' => new ProfileResource($this->profile),
            'preferences' => [
                'genres' => new GenreCollection($this->genres),
                'games' => new GameCollection($this->games),
                'player_types' => new PlayerTypeCollection($this->player_types),
                'langs' => new LangCollection($this->langs),
                'times' => new TimeCollection($this->times),
                'miscs' => new MiscCollection($this->miscs),
            ],
            'online' => false,
            'session' => $this->session_details($this->id),
            'timezone_offset' => $this->timezone_offset
        ];
    }

    private function session_details($id)
    {
        // Session::where(['user1_id' => auth()->id(), 'user2_id' => $id]);
        $session = Session::whereIn('user1_id', [auth('sanctum')->user()->id, $id])->whereIn('user2_id', [auth('sanctum')->user()->id, $id])
            ->first();
        return new SessionResource($session);
    }
}
