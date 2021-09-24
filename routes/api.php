<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScraperController;
use App\Http\Controllers\TcgplayerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|


*/
// Marks Routes
Route::get('/scraper', [ScraperController::class, 'index']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/tcgplayer', [TcgplayerController::class, 'index']);
Route::get('/tcgplayer/groups', [TcgplayerController::class, 'updateCardGroups']);