<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\DataService;
use App\Models\Deck;
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
        $limit = $request->input('limit');

        return $dataService->getAllDecks($isPublic, $leaderCardNumber, $limit);
    }

    public function get_deck_by_user(Request $request)
    {
        $decksByUser = DB::table('deck')
            ->select()
            ->where('userId', auth()->user()->id)
            ->where('isActive', 1)
            ->get();


        return json_decode($decksByUser);
    }

    public function get_deck_view_data(Request $request, DataService $dataService)
    {
        return $dataService->getDeckData($request->input('deckId'));
    }


    public function get_deck_list_card_data(Request $request, DataService $dataService)
    {
        $id = $request->input('deckId');
        return $dataService->getDeckListCardData($id);
    }


    public function get_leaders(Request $request, DataService $dataService)
    {
        return $dataService->getAllLeaders();
    }

    public function submitDeck(Request $request, DataService $dataService)
    {
        $request->validate([
            'deck.leader' => 'required',
            'deck.mainDeck' => 'required'
        ]);

        $input = $request->all();

        $userId = auth()->user()->id;
        $leader = $input['deck']['leader'];
        $title = empty($input['deck']['title']) ? auth()->user()->username . " " . $leader['cardName'] : $input['deck']['title'];
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
            ->first();

        foreach ($mainDeck as $value) {
            $cardNumber = $value['cardNumber'];

            // Check to see if the current card number is the same as the previous cardnumber in the loop
            if ($cardNumber === $currentCardNumber) {
                // if the card number is the same increment the main quantity +1 and assign the card number as the current card
                $mainQty++;
                $currentCard = $cardNumber;
                // update the arrays 'quantity' value from it's previous to the new +1 value
                $newMainDeck[$deckIndex - 1]['quantity'] = $mainQty;
            } else {
                // if the card number is different start the main quantity over at 1
                $mainQty = 1;
                // increment the position of the deck index from the data coming from the website
                $deckIndex++;
                $currentCardNumber = $cardNumber;
                // add a new array inside the $newMainDeck Array with the properties [cardNumber => $currentCardNumber,  quantity => $mainQty]
                $newMainDeck[] = ['cardNumber' => $currentCardNumber, 'quantity' => $mainQty];
            }
        }

        foreach ($newMainDeck as $value) {
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
                $newSideDeck[$sideDeckIndex - 1]['quantity'] = $mainQty;
            } else {
                $mainQty = 1;
                $sideDeckIndex++;
                $currentCardNumber = $cardNumber;
                $newSideDeck[] = ['cardNumber' => $currentCardNumber, 'quantity' => $mainQty];
            }
        }

        foreach ($newSideDeck as $newSideValue) {
            $cardNumber = $newSideValue['cardNumber'];
            $quantity = $newSideValue['quantity'];

            DB::table('deck_data_new')->updateOrInsert(
                ['deckId' => $id->id, 'cardNumber' => $cardNumber],
                ['sideDeckQty' => $quantity]
            );
        }
        return response([
            'id' => $id
        ], 200);
    }

    public function updateDeck(Request $request, DataService $dataService)
    {
        $request->validate([
            'deck.id' => 'required',
            'deck.leader' => 'required',
            'deck.mainDeck' => 'required'
        ]);

        $input = $request->all();

        $userId = auth()->user()->id;
        $leader = $input['deck']['leader'];
        $title = empty($input['deck']['title']) ? auth()->user()->username . " " . $leader['cardName'] : $input['deck']['title'];
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
        $id = $input['deck']['id'];


        DB::table('deck_data_new')->where('deckId', $id)->delete();

        // get cardNumbers only
        $cardNumbersMain = array_column($mainDeck, "cardNumber");
        $cardNumbersSide = array_column($sideDeck, "cardNumber");
        $cardNumberCountMain = array_count_values($cardNumbersMain);
        $cardNumberCountSide = array_count_values($cardNumbersSide);
        $cardNumbersMainUnique = array_unique($cardNumbersMain);
        $cardNumbersSideUnique = array_unique($cardNumbersSide);

        // build the Unique array from mainDeck
        $uniqueMainCardArray = array_filter($mainDeck, function ($key, $value) use ($cardNumbersMainUnique) {
            return in_array($value, array_keys($cardNumbersMainUnique));
        }, ARRAY_FILTER_USE_BOTH);

        // build the Unique array from SideDeck
        $uniqueSideCardArray = array_filter($sideDeck, function ($key, $value) use ($cardNumbersSideUnique) {
            return in_array($value, array_keys($cardNumbersSideUnique));
        }, ARRAY_FILTER_USE_BOTH);

        // merge the lists
        $deckList = array_unique(array_merge($uniqueMainCardArray, $uniqueSideCardArray), SORT_REGULAR);

        $finalList = array_map(function ($d) use ($id, $cardNumberCountMain, $cardNumberCountSide) {
            return (object) [
                "deckId" => $id,
                "cardNumber" => $d['cardNumber'],
                "mainDeckQty" => isset($cardNumberCountMain[$d['cardNumber']]) ? $cardNumberCountMain[$d['cardNumber']] : 0,
                "sideDeckQty" => isset($cardNumberCountSide[$d['cardNumber']]) ? $cardNumberCountSide[$d['cardNumber']] : 0
            ];
        }, $deckList);

        foreach ($finalList as $list) {
            $cardNumber = $list->cardNumber;
            $mQuantity = $list->mainDeckQty;
            $sQuantity = $list->sideDeckQty;


            DB::table('deck_data_new')->updateOrInsert(
                ['deckId' => $id, 'cardNumber' => $cardNumber],
                ['mainDeckQty' => $mQuantity, 'sideDeckQty' => $sQuantity]
            );

            DB::table('deck')
                ->where('id', $id)
                ->update([
                    'title' => $title,
                    'leaderNumber' => $leaderCardNumber,
                    'isPrivate' => $isPrivate,
                    'submitDate' => now()
                ]);
        }


        return response([
            'id' => $id
        ], 200);
    }
    public function deleteDeck(Request $request, DataService $dataService)
    {
        $request->validate([
            'deckId' => 'required'
        ]);

        $id = $request->input('deckId');

        if (Auth::check()) {
            DB::table('deck')
                ->where('id', $id)
                ->update(
                    ['isActive' => 0]
                );

            return response([
                'message' => 'Deck Deleted'
            ], 200);
        } else {
            return response([
                'message' => 'Not Authorized'
            ], 400);
        }
    }
}
