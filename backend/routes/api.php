<?php


use App\Http\Controllers\ChatController;
use App\Http\Controllers\InteractionController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\PreferencePayloadController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\TimeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
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
    Broadcast::routes();
    // this route is for adding or removing user preferences.
    Route::post('/prefs', PreferenceController::class)->name('prefs');

    // this route is for getting a table
    Route::post('/prefs-payload', PreferencePayloadController::class)->name('prefs-payload');

    // this route is for getting a list of user-matches
    Route::get('/match', [MatchController::class, 'match'])->name('match');

    // for chat
    Route::post('/session/create', [SessionController::class, 'create'])->name('create');
    Route::post('/session/{session}/chats', [ChatController::class, 'chats'])->name('chats');
    Route::post('/session/{session}/read', [ChatController::class, 'read'])->name('read');
    Route::post('/session/{session}/clear', [ChatController::class, 'clear'])->name('clear');
    Route::post('/send/{session}', [ChatController::class, 'send'])->name('send');

    // this route is for giving the frontend a list of all current matchups made with other users
    Route::get('/match/all', [MatchController::class, 'currentMatchups'])->name('currentMatchups');

    // this route is for saving interactions from users
    Route::post('/interactions', [InteractionController::class, 'store']);

    // route for updating user's time preferences. frequently requested
    Route::patch('/times', TimeController::class);

    Route::get('/user/prefs', [ProfileController::class, 'getPreferences']);
    Route::get('/user/{user}', [ProfileController::class, 'getProfile']);
    Route::get('/user/{user}/account', [ProfileController::class, 'getAccount']);
    Route::patch('/user/{user}', [ProfileController::class, 'updateProfile']);
    Route::patch('/user/{user}/account', [ProfileController::class, 'updateAccount']);
    Route::patch('/user/{user}/password', [ProfileController::class, 'updatePassword']);
});
