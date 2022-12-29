<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\DeckController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/

Route::prefix('auth')->group(function() {
    Route::post('login', [AuthController::class, 'login']);
    Route::get('check', [AuthController::class, 'check'])->middleware("auth:sanctum");
});

Route::prefix('card')->group(function () {
    Route::get('leaders', [CardController::class, 'leaders']);
});

Route::prefix('deck')->group(function () {
    Route::get('', [DeckController::class, 'index']);
    Route::post('submit', [DeckController::class, 'submit'])->middleware("auth:sanctum");
});


// // Marks Routes
// Route::get('/scraper', [ScraperController::class, 'index']);

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/tcgplayer', [TcgplayerController::class, 'index']);
// Route::get('/tcgplayer/groups', [TcgplayerController::class, 'updateCardGroups']);