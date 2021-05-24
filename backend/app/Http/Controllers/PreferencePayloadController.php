<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Genre;
use App\Models\Lang;
use App\Models\Misc;
use App\Models\PlayerType;
use Illuminate\Http\Request;


class PreferencePayloadController extends Controller
{
    public function __invoke(Request $request)
    {   
        $model = $request->model;

        if(!$model)
        {
            return response(422);
        }

        $className = substr(ucfirst($model), 0, -1);

        if($strpos = strpos($className, '_'))
        {
            $className = substr_replace($className, ucfirst(substr($className, $strpos + 1, 1)), $strpos, 2);
        }

        $class = '\\App\\Models\\'. $className;

        return $class::all();
    }
}
