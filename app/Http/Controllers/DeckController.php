<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Deck;

use Illuminate\Support\Facades\Auth;

class DeckController extends Controller
{
    public function index(Request $request, $id)
    {
        $deck = Deck::where('id', $id)->get();
        return json_decode($deck);
    }

    public function convert()
    {
        $deck = DB::table('deck_data')
        ->select('deckId', 'mainDeckList', 'sideDeckList')
        ->orderBy('id', 'desc')
        ->first(0);
        return  array_map(function($m) use ($deck) {
            return (object) [
                "deckId" => $deck->deckId,
                "cardNumber" => $m->cardNumber,
                "mainDeckQty" => $m->count,
                "sideDeckQty" => (function($m, $sideDeckList) {
                    $key = array_search($m->cardNumber, array_column($sideDeckList, "cardNumber"));
                    return ($key > -1) ? $sideDeckList[$key]['count'] : 0;
                })($m, json_decode($deck->sideDeckList))
            ];
        }, json_decode($deck->mainDeckList));
    }

    public function create(Request $request) {
        try {
            if(!Auth::check()) {
                throw new Exception("Please log in to begin buildiing.");
            }
            $title = $request->input('title');
            $leaderNumber = $request->input('leaderNumber');

            $deck['userId'] = Auth::id();
            $deck['title'] = $title;
            $deck['isPrivate'] = 1;
            $deck['isActive'] = 0;
            $deck['leaderNumber'] = $leaderNumber;

            $deck = Deck::create($deck);
            $deck->save();

            response($deck->id, 200);
            
        } catch(Exception $e) {
            response($e->getMessage(), 401);
        }
    }
}