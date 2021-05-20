<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{
    public $user;

    public function __construct()
    {
        $this->user = auth('sanctum')->user();
    }

    /**
     * The method which adds or removes user preferences. EXCEPT FOR TIMES
     * Request must be formatted like this:
     * model: 'games',
     * model_id: 1
     */

    public function __invoke(Request $request)
    {   
        $model = $request->model;

        if(!($objects = $this->user->{$model}))
        {
            return response(422);
        }

        $className = substr(ucfirst($model), 0, -1);
        $class     = '\\App\\Models\\'. $className;

        if($object = $class::find($request->model_id))
        {
            if($objects->search(fn($userObject) => $userObject->id === $object->id) !== false)
            {
                $this->user->{$model}()->detach($object->id);

                return response(204);
            }

            $this->user->{$model}()->attach($object->id);

            $resource = "\\App\\Http\\Resources\\$className".'Resource';

            return response(new $resource($object), 201);
        }

        return response(['error' => 'Invalid model name id!']);
    }
}
