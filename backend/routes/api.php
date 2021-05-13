<?php

use App\Http\Controllers\MatchController;
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
// header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, PATCH, DELETE');
header('Access-Control-Allow-Headers: Accept, Content-Type, X-Auth-Token, Origin, Authorization');

Route::get('/test', [MatchController::class, 'test']);
require __DIR__ . '/json-api-auth.php';

Route::group(['middleware' => ['auth:sanctum', 'verified']],  function () {
    Route::get('/match', [MatchController::class, 'match'])->name('match');
});