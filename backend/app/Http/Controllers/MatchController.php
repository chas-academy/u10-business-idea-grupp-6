<?php

namespace App\Http\Controllers;

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
        // $this->user = auth()->user();
        $this->user = User::find(9); //debug
        
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
            if($idsArray)
                $query->whereHas($delimiter, function($q) use($idsArray, $delimiter)
                { 
                    $q->where("$delimiter.id", $idsArray);
                });
        }

        // $limit = [];
        // // return response($this->getTimes());
        // $query->whereHas('times', function($q) use(&$limit) {
             
        //     $times = $this->getTimes()['times'];

            

        //     foreach($times as $time)
        //     {
        //         if($time['available'])
        //         {
        //             array_push($limit, $time['interval']);
        //         }
        //     }
            
        //     if(count($limit) === 1)
        //     {
                
        //         $q->where(['times.interval', $limit[0], ['times.available', 1]]);
        //     } else {
        //         // $q->where([['times.interval', ['weekday', 'weekend']], ]);
        //     }

        //     // för varje tid, skapa en position i en array med ett objekt
        //     // objektet vet om den 
        //     // foreach($times as $time)
        //     // {
        //     //     $q->where([['times.interval', $time['interval']], ['times.available', 1]]);
        //     // }
            
        //     // this bit is great for if we have lots of times.... buuuuut....
        //     //     foreach($times as $position => $data)
        //     //     {
        //     //         if($data['available'])
        //     //         {
        //     //             $q->orWhere([
        //     //                     ['times.interval', $data['interval']], 
        //     //                     ['times.available', 1]
        //     //                 ]);
        //     //         }
        //     //     }
        //     // });

        // });
// return response($limit);    
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
