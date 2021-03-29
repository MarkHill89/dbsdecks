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

    public function all()
    {

    }
}
