<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\ErrorException;
use App\Models\Deck;

use Illuminate\Support\Facades\Auth;

class DeckController extends Controller{

    /**
     *  list of all the decks in the database that are active and public
     * 
     * @return \Illuminate\Http\Response 
     */
    public function index()
    {
        $decks = Deck::join('users', 'users.id', '=', 'deck.userId')
        ->join('tcgplayer_card', 'tcgplayer_card.Number', '=', 'deck.leaderNumber')
        ->where('deck.isActive', 1)
        ->where('deck.isPrivate', 0)
        ->orderBy('deck.id', 'desc')
        ->select('deck.id', 'deck.title', 'deck.submitDate', 'users.username', 'deck.leaderNumber', 'tcgplayer_card.imageUrl')
        ->take(24)
        ->get();

        return response($decks, 201);
    }

    /**
     *  created a new deck entry. This is the first step before an actual list is created
     * 
     * @return \Illuminate\Http\Response 
     */
    public function submit(Request $request) {
        try {

            $request->validate([
                'leaderNumber' => 'required'
            ]);

        } catch(ValidationException $e) {

            return response([
                'error' => $e->getMessage()
            ], 500);

        }

        $input = $request->all();
        $userId = $request->user()->id;
        $title = empty($input['title']) ? $request()->user()->username . " " . $leader['cardName'] : $input['title'];
        $isPrivate = 1;
        $isActive = 0;
        $submitDate = now();
        $leaderCardNumber = $input['leaderNumber'];
        
        try {

            $id = DB::table('deck')->insertGetId([
                'userId' => $userId,
                'title' => $title,
                'isPrivate' => $isPrivate,
                'isActive' => $isActive,
                'submitDate' => $submitDate,
                'leaderNumber' => $leaderCardNumber
            ]);

            if(!$id) {
                throw new Exception ("Deck unabel to be created");
            }

            return response([
                'id' => $id,
                'userId' => $userId,
                'title' => $title,
                'isPrivate' => $isPrivate,
                'isActive' => $isActive,
                'submitDate' => $submitDate,
                'leaderNumber' => $leaderCardNumber
            ], 200);

        } catch(Exception $e) { // catch general exceptions
            
            return response([
                'error' => $e->getMessage()
            ], 500);

        } catch(ErrorException $e) { // catch error exceptions
            
            return response([
                'error' => $e->getMessage()
            ], 500);

        }

        return response([
            "error" => "Something has failed"
        ], 500);
    }

    // public function convert()
    // {
    //     $deck = DB::table('deck_data')
    //     ->select('deckId', 'mainDeckList', 'sideDeckList')
    //     ->orderBy('id', 'desc')
    //     ->first(0);
    //     return  array_map(function($m) use ($deck) {
    //         return (object) [
    //             "deckId" => $deck->deckId,
    //             "cardNumber" => $m->cardNumber,
    //             "mainDeckQty" => $m->count,
    //             "sideDeckQty" => (function($m, $sideDeckList) {
    //                 $key = array_search($m->cardNumber, array_column($sideDeckList, "cardNumber"));
    //                 return ($key > -1) ? $sideDeckList[$key]['count'] : 0;
    //             })($m, json_decode($deck->sideDeckList))
    //         ];
    //     }, json_decode($deck->mainDeckList));
    // }

    // public function create(Request $request) {
    //     try {
    //         if(!Auth::check()) {
    //             throw new Exception("Please log in to begin buildiing.");
    //         }
    //         $title = $request->input('title');
    //         $leaderNumber = $request->input('leaderNumber');

    //         $deck['userId'] = Auth::id();
    //         $deck['title'] = $title;
    //         $deck['isPrivate'] = 1;
    //         $deck['isActive'] = 0;
    //         $deck['leaderNumber'] = $leaderNumber;

    //         $deck = Deck::create($deck);
    //         $deck->save();

    //         response($deck->id, 200);
            
    //     } catch(Exception $e) {
    //         response($e->getMessage(), 401);
    //     }
    // }
}