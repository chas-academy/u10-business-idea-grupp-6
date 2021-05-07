<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    public User $user;

    private $delimiters = null;
    private $sortable  = null;
    private $demands    = null;
    private $times      = null;

    public function __construct()
    {
        // $this->user = auth()->user();
        $this->user = User::find(3);

        $this->setDelimiters([
            'player_types' => $this->user->player_types->map(function($i)
            {
                return $i->id;
            }),
             'langs' => $this->user->langs->map(function($i)
             {
                return $i->id;
             })
             ]);

        $this->setSortable('games');

        if($this->user->miscs)
            $this->setDemands(['miscs' => $this->user->miscs->map(function($i)
            {
                return $i->id;
            })]);
        
        $this->setTimes([
            'weekday_time' => $this->user->weekday_time,
            'weekend_time' => $this->user->weekend_time
        ]);

    }

    public function match()
    {
        
        $keys = array_keys(array_merge_recursive(
                $this->getDelimiters(), 
                $this->getDemands(),
                $this->getTimes()));
        
        $query = User::with(
            ...$keys
        );
        
        if($this->getDemands())
        {
            foreach($this->getDemands() as $demand)
            {
                $query->whereHas('miscs', function($q) use($demand)
                {
                    $q->where('miscs.id', $demand);
                });
            }
        }

        foreach($this->getDelimiters() as $delimiter => $idsArray)
        {
            $query->whereHas($delimiter, function($q) use($idsArray, $delimiter)
            {
                $q->where("$delimiter.id", $idsArray);
            });
        }


        $times = $this->getTimes();
        
    
        $timeToLimitBy = "";



        // this logic can go fuck itself
        if($times['weekday_time'] && $times['weekend_time'])
        {
            if(!$times['weekday_time']->available && $times['weekend_time']->available)
                {
                    $timeToLimitBy = 'weekend_time';
                } 
            else if($times['weekday_time']->available && !$times['weekend_time']->available)
                {
                    $timeToLimitBy = 'weekday_time';
                }
        }

        if($times['weekday_time'] && $times['weekday_time']->available && !$times['weekend_time'])
        {
            $timeToLimitBy = 'weekday_time';
        }

        if($times['weekend_time'] && $times['weekend_time']->available && !$times['weekday_time'])
        {
            $timeToLimitBy = 'weekend_time';
        }
        

        if($timeToLimitBy !== "")
        {
            $query->whereHas($timeToLimitBy, function($q) use($timeToLimitBy)
            {
                $q->where($timeToLimitBy .'.available', 1);
            });
        }
        

        $collection = $query->get();

        $sortable = $this->getSortable();
        $collection->sort(function($a, $b) use ($sortable)
        {
            if($this->user->count_matches($a, $sortable) > $this->user->count_matches($b, $sortable))
                return -1;
            return 1;
        });
        dd($collection);
        return response()->json($collection);
    }
    //------------------------------------------------------------------

    
    public function getDelimiters()
    {
        return $this->delimiters;
    }

    public function setDelimiters($arrayOfStrings)
    {
        $this->delimiters = $arrayOfStrings;
    }

    public function setSortable($string)
    {
        $this->sortable = $string;
    }

    public function getDemands()
    {
        return $this->demands;
    }

    public function setDemands($arrayOfStrings)
    {
        $this->demands = $arrayOfStrings;
    }

    public function getSortable()
    {
        return $this->sortable;
    }

    public function getTimes()
    {
        return $this->times;
    }

    public function setTimes($arr)
    {
        $this->times = $arr;
    }
}
