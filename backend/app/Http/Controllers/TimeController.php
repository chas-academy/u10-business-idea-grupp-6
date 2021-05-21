<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TimeController extends Controller
{
    public $user;

    public function __construct()
    {
        $this->user = auth('sanctum')->user();
    }
    
    /**
     * @param Request $request
     * 
     * request example: 
     * {
     *      from: 11.5,
     *      to: 15,
     *      interval: 'weekday',
     *      available: 1,
     * }
     */
    public function __invoke(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'from' => 'numeric|required',
            'to' => 'numeric|required',
            'interval' => 'in:weekday,weekend',
            'available' => 'required|boolean'
        ]);

        if($validator->fails())
            return response()->json(['error' => $validator->messages()], 422);
        
        $this->user->times()->where('interval', $request->interval)->first()->update($request->all());
        return response(['message' => 'Times successfully updated!'], 201);
    }
}
