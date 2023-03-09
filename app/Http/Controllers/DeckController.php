<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\ErrorException;
use App\Models\Deck;
use App\Models\DeckData;

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
     *  select a deck by id
     * 
     * @return \Illuminate\Http\Response 
     */
    public function select(Request $request, $deckId) {
        try { 
            $id = (int) $deckId;

            if(!$id) {
                throw new Exception("invalid deck id");
            }

            $deck = Deck::join('users', 'users.id', '=', 'deck.userId')
            ->where('deck.id', $id)
            ->select('deck.id', 'deck.title', 'deck.submitDate', 'users.username', 'deck.isActive', 'deck.isPrivate')
            ->first();

            $leader = Deck::join('v_unique_cards', 'deck.leaderNumber', '=', 'v_unique_cards.Number')
            ->where('deck.id', $id)
            ->select(
            'v_unique_cards.name',
            'v_unique_cards.rarity',
            'v_unique_cards.text',
            'v_unique_cards.cardType',
            'v_unique_cards.color',
            'v_unique_cards.cost',
            'v_unique_cards.specialTrait',
            'v_unique_cards.power',
            'v_unique_cards.comboPower',
            'v_unique_cards.comboEnergy',
            'v_unique_cards.era',
            'v_unique_cards.cardCharacter',
            'v_unique_cards.url',
            'v_unique_cards.imageUrl')
            ->first();


            $deckData = DeckData::join('v_unique_cards', 'deck_data_new.cardNumber', '=', 'v_unique_cards.Number')
            ->where('deck_data_new.deckId', $id)
            ->select(
                'deck_data_new.cardNumber',
                'deck_data_new.mainDeckQty',
                'deck_data_new.sideDeckQty',
                'deck_data_new.zDeckQty',
                'v_unique_cards.name',
                'v_unique_cards.rarity',
                'v_unique_cards.text',
                'v_unique_cards.cardType',
                'v_unique_cards.color',
                'v_unique_cards.cost',
                'v_unique_cards.specialTrait',
                'v_unique_cards.power',
                'v_unique_cards.comboPower',
                'v_unique_cards.comboEnergy',
                'v_unique_cards.era',
                'v_unique_cards.cardCharacter',
                'v_unique_cards.url',
                'v_unique_cards.imageUrl'
            )
            ->distinct()
            ->get();
   
            $deck->leader = $leader;
            $deck->deckData = $deckData;
      
            return response($deck, 201);

        } catch(Exception $e) {
            return response([
                'error' => $e->getMessage()
            ], 500);
        }
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

}