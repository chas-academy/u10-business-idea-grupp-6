<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SessionResource extends JsonResource
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
            'open' => false,
            'users' => [$this->user_a_id, $this->user_b_id],
            'unreadCount' => $this->chats->where('read_at', null)->where('type', 0)->where('user_id', '!=', auth('sanctum')->id())->count()
        ];
    }
}
