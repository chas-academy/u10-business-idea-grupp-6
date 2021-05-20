<?php

namespace App\Http\Controllers;

use App\Models\Game;
use \App\Models\User;

use Illuminate\Http\Request;

class TimesController extends Controller
{
    public $user;

    public function __invoke(Request $request)
    {
        // update a user's times.
    }
}
