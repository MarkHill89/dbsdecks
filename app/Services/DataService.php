<?php


namespace App\Services;

use App\Helpers\Proc;
use Illuminate\Support\Facades\Log;
use Ramsey\Uuid\Type\Integer;
use Illuminate\Support\Facades\DB;

class DataService
{
    public function getAllCards()
    {
        return collect(Proc::call('all_cards'))
            ->map(function ($row) {
                return [
                    "title" => $row != null ? $row->cardName : '',
                    "cardNumber" => $row != null ? $row->cardNumber : '',
                    "rarity" => $row != null ? $row->rarity : '',
                    "description" => $row != null ? $row->cardText : '',
                    "cardType" => $row != null ? $row->cardType : '',
                    "color" => $row != null ? $row->color : '',
                    "energyCost" => $row != null ? $row->energyCost : '',
                    "specialTrait" => $row != null ? $row->specialTrait : '',
                    "power" => $row != null ? $row->power : '',
                    "comboPower" => $row != null ? $row->comboPower : '',
                    "comboEnergy" => $row != null ? $row->comboEnergy : '',
                    "era" => $row != null ? $row->era : '',
                    "cardCharacter" => $row != null ? $row->cardCharacter : '',
                    "url" => $row != null ? $row->url : '',
                    "thumbnail" => $row != null ? $row->imageUrl : '',
                    "isUltimate" => $row != null ? $row->isUltimate : 0,
                    "isSuperCombo" => $row != null ? $row->isSuperCombo : 0,
                    "isDragonBall" => $row != null ? $row->isDragonBall : 0,
                    "cardLimit" => $row != null ? $row->cardLimit : 0
                ];
            });
    }

    public function getDeckListData(int $id)
    {
        $mainDeck = [];
        $sideDeck = [];
        $deckListArray = collect(Proc::callParm('get_deck_list_data', [
            'id' => $id
        ]))
            ->map(function ($row) {
                return [
                    'cardNumber' => $row != null ? $row->cardNumber : '',
                    'cleanName' => $row != null ? $row->cleanName : '',
                    'thumbnail' => $row != null ? $row->imageUrl : '',
                    'mainDeckQty' => $row != null ? $row->mainDeckQty : 0,
                    'sideDeckQty' => $row != null ? $row->sideDeckQty : 0,
                    'color' => $row != null ? $row->Color : ''
                ];
            });

        // if the array returns empty, then that means the deck is old formats
        // we will convert an old list here into a new list and return that
        if (sizeof($deckListArray) === 0) {
            $deckListArray = $this->convertFromOldFormat($id);
            foreach ($deckListArray as $row) {
                DB::table('deck_data_new')->insert([
                    'deckId' => $row != null ? $row->deckId : '',
                    'cardNumber' => $row != null ? $row->cardNumber : '',
                    'mainDeckQty' => $row != null ? $row->mainDeckQty : 0,
                    'sideDeckQty' => $row != null ? $row->sideDeckQty : 0
                ]);
            }
            $deckList = collect(Proc::callParm('get_deck_list_data', [
                'id' => $id
            ]))
                ->map(function ($row) {
                    return [
                        'cardNumber' => $row != null ? $row->cardNumber : '',
                        'cleanName' => $row != null ? $row->cleanName : '',
                        'thumbnail' => $row != null ? $row->imageUrl : '',
                        'mainDeckQty' => $row != null ? $row->mainDeckQty : 0,
                        'sideDeckQty' => $row != null ? $row->sideDeckQty : 0,
                        'color' => $row != null ? $row->Color : ''
                    ];
                });

            foreach ($deckList as $row) {
                for ($i = 0; $i < $row['mainDeckQty']; $i++) {
                    array_push($mainDeck, [
                        'cardNumber' => $row != null ? $row['cardNumber'] : '',
                        'title' => $row != null ? $row['cleanName'] : '',
                        'thumbnail' => $row != null ? $row['thumbnail'] : '',
                        'color' => $row != null ? $row['color'] : ''
                    ]);
                }
                for ($i = 0; $i < $row['sideDeckQty']; $i++) {
                    array_push($sideDeck, [
                        'cardNumber' => $row != null ? $row['cardNumber'] : '',
                        'title' => $row != null ? $row['cleanName'] : '',
                        'thumbnail' => $row != null ? $row['thumbnail'] : '',
                        'color' => $row != null ? $row['color'] : ''
                    ]);
                }
            }
            return [
                "mainDeck" => $mainDeck,
                "sideDeck" => $sideDeck
            ];
        }
        foreach ($deckListArray as $row) {
            for ($i = 0; $i < $row['mainDeckQty']; $i++) {
                array_push($mainDeck, [
                    'cardNumber' => $row != null ? $row['cardNumber'] : '',
                    'title' => $row != null ? $row['cleanName'] : '',
                    'thumbnail' => $row != null ? $row['thumbnail'] : '',
                    'color' => $row != null ? $row['color'] : ''
                ]);
            }
            for ($i = 0; $i < $row['sideDeckQty']; $i++) {
                array_push($sideDeck, [
                    'cardNumber' => $row != null ? $row['cardNumber'] : '',
                    'title' => $row != null ? $row['cleanName'] : '',
                    'thumbnail' => $row != null ? $row['thumbnail'] : '',
                    'color' => $row != null ? $row['color'] : ''
                ]);
            }
        }
        return [
            "mainDeck" => $mainDeck,
            "sideDeck" => $sideDeck
        ];
    }

    public function getAllDecks(int $isPublic, string $leaderCardNumber)
    {
        return collect(Proc::callParm('get_deck_lists_all', [
            'isPublic' => $isPublic,
            'leaderCard' => $leaderCardNumber,
        ]))
            ->map(function ($row) {
                return [
                    'id' => $row != null ? $row->id : 0,
                    'title' => $row != null ? $row->title : '',
                    'isPrivate' => $row != null ? $row->isPrivate : 0,
                    'isActive' => $row != null ? $row->isActive : 0,
                    'submitDate' => $row != null ? $row->submitDate : 0,
                    'leaderCardNumber' => $row != null ? $row->leaderCardNumber : 0,
                    'username' => $row != null ? $row->username : ''
                ];
            });
    }

    public function getAllLeaders()
    {
        return collect(Proc::call('get_leaders'))
            ->map(function ($row) {
                return [
                    'id' => $row != null ? $row->id : 0,
                    'cardSetNumber' => $row != null ? $row->Number : '',
                    'cardName' => $row != null ? $row->name : 0,
                    'tcgUrl' => $row != null ? $row->url : '',
                    'imageUrl' => $row != null ? $row->imageUrl : ''
                ];
            });
    }

    public function getTrendingLeaders()
    {
        return collect(Proc::call('get_trending_leaders'))
            ->map(function ($row) {
                return [
                    'cardName' => $row != null ? $row->cardName : '',
                    'cardNumber' => $row != null ? $row->cardNumber : '',
                    'cardId' => $row != null ? $row->cardId : '',
                    'imageUrl' => $row != null ? $row->imageUrl : '',
                    'leaderCount' => $row != null ? $row->leaderCount : 0,
                ];
            });
    }

    public function convertFromOldFormat($id)
    {
        $deck = DB::table('deck_data')
            ->select('deckId', 'mainDeckList', 'sideDeckList')
            ->where('deckId', $id)
            ->first(0);
        return  array_map(function ($m) use ($deck) {
            return (object) [
                "deckId" => $deck->deckId,
                "cardNumber" => $m->cardNumber,
                "mainDeckQty" => $m->count,
                "sideDeckQty" => (function ($m, $sideDeckList) {
                    $key = array_search($m->cardNumber, array_column($sideDeckList, "cardNumber"));
                    return ($key > -1) ? $sideDeckList[$key]['count'] : 0;
                })($m, json_decode($deck->sideDeckList))
            ];
        }, json_decode($deck->mainDeckList));
    }
}
