<?php

namespace App\Http\Resources;

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
            'timezone_offset' => $this->timezone_offset
        ];
    }
}
