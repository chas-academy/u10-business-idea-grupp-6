<?php

namespace App\Http\Controllers;

use App\Models\Interaction;
use App\Models\User;
use Illuminate\Http\Request;

class InteractionController extends Controller
{
    private $user;

    public function __construct()
    {
        $this->user = auth('sanctum')->user();
    }


    /**
     * This request must have a key 'object_user_id' integer for matching purposes,
     * a 'likes' key that is 1 or 0,
     * and be sent from an authenticated user
     */
    public function store(Request $request)
    {
        if($request->object_user_id !== $this->user->id)
            Interaction::create([
            'subject_user_id' => $this->user->id,
            'object_user_id' => $request->object_user_id,
            'likes' => $request->likes
        ]);
        
        return response(201);
    }
}
