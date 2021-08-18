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
            'deck.leader' => 'required',
            'deck.mainDeck' => 'required'
        ]);

        $input = $request->all();

        $userId = auth()->user()->id;
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

        //  insert into dbsdecks_one.deck   (userId, title, isPrivate, isActive,submitDate,leaderNumber) 
        //                          values  (6171, 'manual sql insert', 0,1, now(), 'BT1-001');

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
            ->first();


        DB::table('deck_data_new')->where('deckId', $id)->delete();

        foreach ($mainDeck as $value) {
            $cardNumber = $value['cardNumber'];
            if ($cardNumber === $currentCardNumber) {
                $mainQty++;
                $currentCard = $cardNumber;
            } else {
                $mainQty = 1;
                $currentCardNumber = $cardNumber;
            }

            DB::table('deck_data_new')->updateOrInsert(
                ['deckId' => $id, 'cardNumber' => $cardNumber],
                ['mainDeckQty' => $mainQty]
            );
        }

        foreach ($sideDeck as $value) {
            $cardNumber = $value['cardNumber'];
            if ($cardNumber === $currentCardNumber) {
                $sideQty++;
                $currentCard = $cardNumber;
            } else {
                $sideQty = 1;
                $currentCardNumber = $cardNumber;
            }
            DB::table('deck_data_new')->updateOrInsert(
                ['deckId' => 1, 'cardNumber' => $cardNumber],
                ['sideDeckQty' => $sideQty]
            );
        }
    }
}
