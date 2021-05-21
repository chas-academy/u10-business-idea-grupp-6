<?php

namespace App\Http\Resources;

use App\Models\Session;
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
        $users = $this->users; //will be 2
        
        // a och b. om a är users 1 och b är users 2 eller tvärt om
        $session = \App\Models\Session::where(function($q) use($users){
            $q->where('user_a_id', $users[0]->id)->where('user_b_id', $users[1]->id);
        })->orWhere(function($q) use ($users){
            $q->where('user_b_id', $users[0]->id)->where('user_a_id', $users[1]->id);
        })->first();

        return [
            'id' => $this->id,
            'user' => new UserCollection($this->users->filter(fn($u) => $u->id !== auth('sanctum')->user()->id)),
            'session' => new SessionResource($session),
            'timestamps' => $this->timestamps,
        ];
    }
}
