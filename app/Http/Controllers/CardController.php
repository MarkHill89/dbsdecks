<?php

namespace App\Http\Controllers;

use App\Services\DataService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CardController extends Controller
{
    public function allCards(Request $request, DataService $dataService)
    {
        return $dataService->getAllCards();
    }

    public function get_trending_leaders(Request $request, DataService $dataService)
    {
        return $dataService->getTrendingLeaders();
    }

    public function get_deck_lists_all(Request $request, DataService $dataService)
    {
        $isPublic = $request->input('isPublic');
        $leaderCardNumber = $request->input('leaderCard');

        return $dataService->getAllDecks($isPublic, $leaderCardNumber);
    }

    public function get_deck_view_data(Request $request)
    {
        $id = $request->input('deckId');

        return collect(DB::table('deck')
                        ->where('id', $id)
                        ->first()
                );
    }
    

    public function get_deck_list_data(Request $request, DataService $dataService)
    {
        $id = $request->input('deckId');
        return $dataService->getDeckListData($id);
        
    }

    public function get_leaders(Request $request, DataService $dataService)
    {
        return $dataService->getAllLeaders();
    }

    public function submitDeck(Request $request, DataService $dataService)
    {
        $request->validate([
        'deck.id' => 'required',
        'deck.leader' => 'required',
        'deck.mainDeck' => 'required'
        ]);
        
        $input = $request->all();
        // $id = $input['deck']['id']; TODO Ask Mark how to handle deckIDS and how to create new ones
        $id = 9999999;
        $userId = 6171;
        $title = 'this is a test for the new DBS Decks';
        $leader = $input['deck']['leader'];
        $mainDeck = $input['deck']['mainDeck'];
        $sideDeck = $input['deck']['sideDeck'];
        $isPrivate = 0;
        $isActive = 1;
        $submitDate = now();
        $leaderCardNumber = $leader['cardNumber'];
        
        $mainQty = 0;
        $sideQty = 0;
        $currentCardNumber = '';
        
        DB::table('deck')->updateOrInsert(
            ['userId' => $userId],
            [
                'title' => $title
            ]
        );

        DB::table('deck_data_new')->where('deckId', $id)->delete();

        foreach ($mainDeck as $value) {
            $cardNumber = $value['cardNumber'];
            if($cardNumber === $currentCardNumber){
                $mainQty++;
                $currentCard = $cardNumber;
            } else {
                $mainQty= 1;
                $currentCardNumber = $cardNumber;
            }

            DB::table('deck_data_new')->updateOrInsert(
                ['deckId' => $id,'cardNumber' => $cardNumber],
                ['mainDeckQty' => $mainQty]
            );
        }

        foreach ($sideDeck as $value) {
            $cardNumber = $value['cardNumber'];
            if($cardNumber === $currentCardNumber){
                $sideQty++;
                $currentCard = $cardNumber;
            } else {
                $sideQty= 1;
                $currentCardNumber = $cardNumber;
            }
            DB::table('deck_data_new')->updateOrInsert(
                ['deckId' => 1,'cardNumber' => $cardNumber],
                ['sideDeckQty' => $sideQty]
            );
        }

    }
}
