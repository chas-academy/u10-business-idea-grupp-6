<?php

namespace App\Http\Controllers\Preferences;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;

class GameController extends Controller
{
    
    public User $user;
    
    public function __construct()
    {
        $this->user = auth('sanctum')->user();
    }

    public function __invoke(Request $request)
    {   
        if($game = Game::find($request->game_id))
        {
            $games = $this->user->games;

            if($games->search(function($userGame) use($game)
            {
                return $userGame->id === $game->id;
            }) !== false)
            {
                $this->user->games()->detach($game->id);

                return response(['game_removed' => $game]);
            }

            $this->user->games()->attach($game->id);
            
            return response(['game_added' => $game]);
        }
        
        return response(['error' => 'Invalid game id!']);
    }
}
