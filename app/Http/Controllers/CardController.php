<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\DataService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        return collect(
            DB::table('deck')
                ->where('id', $id)
                ->first()
        );
    }

    public function get_deck_by_user(Request $request)
    {
        $user = auth()->user();
        $deckLists = DB::table('deck')
            ->where('userId', $user->id)
            ->get();

        return json_decode($deckLists);
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
            'deck.title' => 'required',
            'deck.leader' => 'required',
            'deck.mainDeck' => 'required'
        ]);

        $input = $request->all();

        $userId = auth()->user()->id;
        $title = $input['deck']['title'];
        $leader = $input['deck']['leader'];
        $mainDeck = $input['deck']['mainDeck'];
        $sideDeck = $input['deck']['sideDeck'];
        $isPrivate = $input['deck']['isPrivate'];
        $isActive = 1;
        $submitDate = now();
        $leaderCardNumber = $leader['cardNumber'];

        $mainQty = 0;
        $sideQty = 0;
        $currentCardNumber = '';
        $newMainDeck = [];
        $newSideDeck = [];
        $deckIndex = 0;
        $sideDeckIndex = 0;

        
        DB::table('deck')->insert(
            [
                'userId' => $userId,
                'title' => $title,
                'isPrivate' => $isPrivate,
                'isActive' => $isActive,
                'submitDate' => $submitDate,
                'leaderNumber' => $leaderCardNumber
            ]
        );

        $id = DB::table('deck')
            ->select('id')
            ->orderBy('id', 'desc')
            ->first(0);

        DB::table('deck_data_new')->where('deckId', $id)->delete();

        foreach ($mainDeck as $value) {
            $cardNumber = $value['cardNumber'];

            if ($cardNumber === $currentCardNumber) {
                $mainQty++;
                $currentCard = $cardNumber;
                $newMaindeck[$deckIndex -1]['quantity'] = $mainQty;
            } else {
                $mainQty = 1;
                $deckIndex++;
                $currentCardNumber = $cardNumber;
                $newMaindeck[] = ['cardNumber' => $currentCardNumber, 'quantity' => $mainQty];
            }
        }

        foreach($newMaindeck as $value){
            $cardNumber = $value['cardNumber'];
            $quantity = $value['quantity'];

            DB::table('deck_data_new')->updateOrInsert(
                  ['deckId' => $id->id, 'cardNumber' => $cardNumber],
                  ['mainDeckQty' => $quantity]
            );
        }

        foreach ($sideDeck as $sideValue) {
            $cardNumber = $sideValue['cardNumber'];
            if ($cardNumber === $currentCardNumber) {
                $mainQty++;
                $currentCard = $cardNumber;
                $newSideDeck[$sideDeckIndex -1]['quantity'] = $mainQty;
            } else {
                $mainQty = 1;
                $sideDeckIndex++;
                $currentCardNumber = $cardNumber;
                $newSideDeck[] = ['cardNumber' => $currentCardNumber, 'quantity' => $mainQty];
            }
        }

        foreach($newSideDeck as $newSideValue){
            $cardNumber = $newSideValue['cardNumber'];
            $quantity = $newSideValue['quantity'];

            DB::table('deck_data_new')->updateOrInsert(
                  ['deckId' => $id->id, 'cardNumber' => $cardNumber],
                  ['sideDeckQty' => $quantity]
            );
        }
    }
}
