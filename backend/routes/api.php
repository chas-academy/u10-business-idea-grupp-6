<?php

use App\Http\Controllers\MatchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\TimeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

require __DIR__ . '/json-api-auth.php';

Route::group(['middleware' => ['auth:sanctum', 'verified']],  function () {

    // this route is for adding or removing user preferences.
    Route::post('/prefs', PreferenceController::class)->name('prefs');

    // this route is for getting a list of user-matches
    Route::get('/match', [MatchController::class, 'match'])->name('match');

    // route for updating user's time preferences. frequently requested
    Route::patch('/times', TimeController::class);

    Route::get('/user/{user}', [ProfileController::class, 'getProfile']);
    Route::get('/user/{user}/account', [ProfileController::class, 'getAccount']);
    Route::patch('/user/{user}', [ProfileController::class, 'updateProfile']);
    Route::patch('/user/{user}/account', [ProfileController::class, 'updateAccount']);
    Route::patch('/user/{user}/password', [ProfileController::class, 'updatePassword']);
});