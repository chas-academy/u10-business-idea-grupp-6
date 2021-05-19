<?php

namespace App\Http\Controllers;

use App\Http\Resources\MatchupCollection;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public User $user;

    private $delimiters = null;
    private $sortable   = null;
    private $demands    = null;
    private $times      = null;


    
    public function __construct()
    {
        $this->user = auth('sanctum')->user();
        // $this->user = User::find(9); //debug
        
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

        public function test(Request $request)
    {
        return response(['request' => $request->all()]);
    }

    public function match()
    {  
        // pick out all related tables needed for filtering
        $keys = array_keys(array_merge_recursive(
                $this->getDelimiters(), 
                $this->getDemands(),
                $this->getTimes()
        ));

        $query = User::with(
            ...$keys
        );
        
        foreach($this->getDemands() as $demand => $idsArray)
        {
            if($idsArray)
                $query->whereHas('miscs', function($q) use($demand)
                {
                    $q->where('miscs.id', $demand);
                });
        }


        foreach($this->getDelimiters() as $delimiter => $idsArray)
        {
            if($idsArray)
                $query->whereHas($delimiter, function($q) use($idsArray, $delimiter)
                { 
                    $q->where("$delimiter.id", $idsArray);
                });
        }

        $times = $this->getTimes()['times'];
    
        if($times)
        {
            $query->whereHas('times', function($q) use ($times)
                {
                    // match those that have a time with the interval of choosing
                    $q->where('times.interval', $times);
                });
        }

        // execute
        $collection = $query->get();

        // this is a single sorting parameter right now
        $sortable = $this->getSortable();

        $collection->sort(function($a, $b) use ($sortable)
        {
            // this is quite query heavy
            if($this->user->count_matches($a, $sortable) > $this->user->count_matches($b, $sortable))
                return -1;
            return 1;
        });
        // dd($collection); //debug
        return response(new UserCollection($collection));
    }

    /**
     * Returns all of a user's matches
     */
    public function currentMatchups()
    {
        return response(new MatchupCollection($this->user->matchups));
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
            $times[$value] = $this->user->{$value}->pluck('interval')->toArray();
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
