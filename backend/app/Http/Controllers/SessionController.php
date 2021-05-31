<?php

namespace App\Http\Controllers;

use App\Events\SessionEvent;
use App\Http\Resources\SessionResource;
use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function create(Request $request)
    {
        if($session = Session::where('user_a_id', $request->friend_id)->where('user_b_id',  auth('sanctum')->user()->id)->first())
        {
            $modifiedSession = new SessionResource($session);
        }
        else 
        {
            $session = Session::create(['user_a_id' => auth('sanctum')->user()->id, 'user_b_id' => $request->friend_id]);
            $modifiedSession = new SessionResource($session);
        }

        broadcast(new SessionEvent($modifiedSession, auth('sanctum')->user()->id));

        return $modifiedSession;
    }
}
