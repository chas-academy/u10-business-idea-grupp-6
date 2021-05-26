<?php

namespace App\Http\Controllers;

use App\Http\Resources\MatchupCollection;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\Interaction;
use App\Models\Matchup;
use App\Models\Session;
use App\Models\User;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public $user;

    private $delimiters = null;
    private $sortable   = null;
    private $demands    = null;
    private $times      = null;



    public function __construct()
    {
        $this->user = auth('sanctum')->user();

        if($this->user === null)
        {
            abort(403);
        }

        $this->setDelimiters([
            'player_types',
            'langs'
        ]);

        $this->setSortable('games');

        if($this->user->miscs)
            $this->setDemands([
                'miscs'
            ]);

        $this->setTimes([
            'times'
        ]);
    }



    public function match()
    {  
        $keys = array_keys(array_merge_recursive(
                $this->getDelimiters(), 
                $this->getDemands()
        ));

        $query = User::with(
            ...$keys,
        );


        // only get users that haven't been swiped on yet
        if(count($subject_interactions_objects = $this->user->subject_interactions->pluck('object_user_id')))
            $query->whereNotIn('id', $subject_interactions_objects);

   
        foreach($this->getDemands() as $demand => $idsArray)
        {
            if(count($idsArray))
                $query->whereHas('miscs', function($q) use($demand, $idsArray)
                {
                    foreach($idsArray as $id)
                    {
                        $q->where('miscs.id', $id);
                    }
                    
                });
        }

        foreach($this->getDelimiters() as $delimiter => $idsArray)
        {
            if(count($idsArray))
                $query->whereHas($delimiter, function($q) use($idsArray, $delimiter)
                {
                    $q->where("$delimiter.id", $idsArray);
                });
        }

        $collection = $query->get();

        $sortable = $this->getSortable();

        $collection->sort(function ($a, $b) use ($sortable) {
            // this is quite query heavy
            if($this->user->count_matches($a, $sortable) > $this->user->count_matches($b, $sortable))
                return -1;
          
            return 1;
        });

        return response(new UserCollection($collection));
    }
    

    /**
     * Returns all of a user's matches
     */
    public function currentMatchups()
    {
        return response(new MatchupCollection($this->user->matchups));
    }


    public function deleteMatchup(Request $request)
    {

        if($matchup = Matchup::find($request->matchup_id))
            if($matchup->users->contains('id', $this->user->id))
            {
                $userB = $matchup->users->filter(fn($i) => $i->id !== $this->user->id)->first();
                
                if($session = Session::where([
                    ['user_a_id', $this->user->id],
                    ['user_b_id', $userB->id]])
                ->orWhere([
                    ['user_a_id', $userB->id],
                    ['user_b_id', $this->user->id]
                ]))
                    $session->delete();
                    
                $interaction = Interaction::where([
                    ['subject_user_id', $this->user->id],
                    ['object_user_id', $userB->id]])
                    ->update(['likes' => 0]);
            
                $matchup->users()->detach([$this->user->id, $userB->id]);
                $matchup->delete();
                return response(201);
            }
    }
    //------------------------------------------------------------------


    public function setDelimiters($arrayOfStrings)
    {
        $delimiters = [];

        foreach($arrayOfStrings as $key => $value)
        {
            $delimiters[$value] = $this->user->{$value}->pluck('id')->toArray();
        }

        $this->delimiters = $delimiters;
    }

    public function setSortable($string)
    {
        $this->sortable = $string;
    }

    public function setDemands($arrayOfStrings)
    {
        $demands = [];

        foreach($arrayOfStrings as $key => $value)
        {
            $demands[$value] = $this->user->{$value}->pluck('id')->toArray();
        }

        $this->demands = $demands;
    }

    public function setTimes($arrayOfStrings)
    {
        $times = [];

        foreach($arrayOfStrings as $key => $value)
        {
            $times[$value] = $this->user->{$value}()->select('interval', 'available')->get()->filter(fn($i)=> $i->available === 1)
            ->toArray();
        }

        $this->times = $times;
    }

    public function getDemands()
    {
        return $this->demands;
    }

    public function getDelimiters()
    {
        return $this->delimiters;
    }

    public function getSortable()
    {
        return $this->sortable;
    }


    public function getTimes()
    {
        return $this->times;
    }
}
