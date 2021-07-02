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

    public function get_deck_lists_all(Request $request, DataService $dataService)
    {
        $isPublic = $request->input('isPublic');
        $leaderCardNumber = $request->input('leaderCard');

        return $dataService->getAllDecks($isPublic, $leaderCardNumber);
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
}
