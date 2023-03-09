<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\DataService;
use App\Models\Deck;
use App\Models\Card;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CardController extends Controller
{

     /**
     *  returns only leader cards
     * 
     * @return \Illuminate\Http\Response 
     */
    public function leaders() {
        $cards = Card::where("cardType", "Leader")
        ->orderBy('name')
        ->select('name', 'imageUrl', 'Number')
        ->get();

        return response($cards, 200);
    }

    /**
     * returns everything but leader cards
     * 
     * @return \Illuminate\Http\Response
     */
    public function nonleaders() {
        $cards = Card::whereNotIn('cardType', ['Leader'])
        ->select(
                'name',
                'rarity',
                'text',
                'cardType',
                'color',
                'cost',
                'specialTrait',
                'power',
                'comboPower',
                'comboEnergy',
                'era',
                'cardCharacter',
                'url',
                'imageUrl'
        )
        ->distinct()
        ->get();

        return response($cards, 200);
    }

}
