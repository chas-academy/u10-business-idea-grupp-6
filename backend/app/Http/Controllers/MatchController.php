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
        $this->user = User::find(10);

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
        
        $this->setTimes(['times' => $this->user->times->map(function($i)
        {
            return $i->interval;
        })]);

    }

    public function match()
    {  

        $keys = array_keys(array_merge_recursive(
                $this->getDelimiters(), 
                $this->getDemands(),
                $this->getTimes()
        ));
        
        $query = User::with(
            ...$keys
        );
        
        

        
        if(count($this->getDemands()['miscs']))
        {
            foreach($this->getDemands() as $demand)
            {
                $query->whereHas('miscs', function($q) use($demand)
                {
                    dd($demand);
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


        $times = $this->getTimes()['times'];
    
        if($times)
        {
                $query->whereHas('times', function($q) use ($times)
                {
                    $q->where('times.interval', $times);
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
