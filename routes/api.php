<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\DeckController;
use App\Http\Controllers\ScraperController;
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
    Route::get('nonleaders', [CardController::class, 'nonleaders']);
});

Route::prefix('deck')->group(function () {
    Route::get('', [DeckController::class, 'index']);
    Route::post('submit', [DeckController::class, 'submit'])->middleware("auth:sanctum");
    Route::get('select/{deckId}', [DeckController::class, 'select']);
});

Route::prefix('utility')->group(function () {
    Route::get('scraper', [ScraperController::class, 'pull']);
});

// // Marks Routes
// Route::get('/scraper', [ScraperController::class, 'index']);

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/tcgplayer', [TcgplayerController::class, 'index']);
// Route::get('/tcgplayer/groups', [TcgplayerController::class, 'updateCardGroups']);