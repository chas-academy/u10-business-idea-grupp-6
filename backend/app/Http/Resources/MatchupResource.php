<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MatchupResource extends JsonResource
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
            'user' => new UserCollection($this->users->filter(fn($u) => $u->id !== auth('sanctum')->user()->id)),
            'timestamps' => $this->timestamps,
        ];
    }
}
