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
                    "cardName" => $row != null ? $row->cardName : '',
                    "cardNumber" => $row != null ? $row->cardNumber : '',
                    "rarity" => $row != null ? $row->rarity : '',
                    "cardText" => $row != null ? $row->cardText : '',
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
                    "thumbnail" => $row != null ? explode(';', $row->imageUrl) : '',
                    "isUltimate" => $row != null ? $row->isUltimate : 0,
                    "isSuperCombo" => $row != null ? $row->isSuperCombo : 0,
                    "isDragonBall" => $row != null ? $row->isDragonBall : 0,
                    "cardLimit" => $row != null ? $row->cardLimit : 0
                ];
            });
    }

    public function getDeckData(int $id)
    {
        return collect(Proc::callParm('get_deck_data', ['id' => $id]))
            ->map(function ($row) {

                return [
                    "id" => $row != null ? $row->id : '',
                    "title" => $row != null ? $row->title : '',
                    "isPrivate" => $row != null ? $row->isPrivate : '',
                    "submitDate" => $row != null ? $row->submitDate : '',
                    "username" => $row != null ? $row->username : '',
                    "leaderName" => $row != null ? $row->leaderName : '',
                    "leaderCardNumber" => $row != null ? $row->leaderNumber : '',
                    "thumbnail" => $row != null ? explode(';', $row->imageUrl) : '',
                    "cardText" => $row != null ? $row->cardText : '',
                    "url" => $row != null ? $row->url : '',
                    "userId" => $row != null ? $row->userId : ''
                ];
            })[0];
    }

    public function getDeckListCardData(int $id)
    {
        $mainDeck = [];
        $sideDeck = [];
        $leader = [];

        $leader = collect(Proc::callParm('get_leader_deck_data', [
            'id' => $id
        ]))
            ->map(function ($row) {
                return [
                    'id' => $row != null ? $row->id : 0,
                    'name' => $row != null ? $row->name : '',
                    'cardName'  => $row != null ? $row->cleanName : '',
                    'rarity'  => $row != null ? $row->Rarity : '',
                    'cardNumber'  => $row != null ? $row->Number : 0,
                    'cardLimit' => 1,
                    'isDragonBall'=> 0,
                    'isSuperCombo'=> 0,
                    'isUltimate'=> 0,
                    'cardText'  => $row != null ? $row->Description : '',
                    'cardType'  => $row != null ? $row->CardType : '',
                    'color'  => $row != null ? $row->Color : '',
                    'energyCost'  => $row != null ? $row->EnergyColorCost : '',
                    'specialTrait'  => $row != null ? $row->SpecialTrait : '',
                    'power'  => $row != null ? $row->Power : '',
                    'comboPower'  => $row != null ? $row->ComboPower : '',
                    'comboEnergy'  => $row != null ? $row->ComboEnergy : '',
                    'era'  => $row != null ? $row->Era : '',
                    'cardCharacter'  => $row != null ? $row->Character : '',
                    'url'  => $row != null ? $row->url : '',
                    'thumbnail'  => $row != null ? explode(';', $row->imageUrl) : ''
                ];
            });

        $deckListArray = collect(Proc::callParm('get_deck_list_data', [
            'id' => $id
        ]))
            ->map(function ($row) {
                return [
                    'cardNumber' => $row != null ? $row->cardNumber : '',
                    'cleanName' => $row != null ? $row->cleanName : '',
                    'cardText' => $row != null ? $row->Description : '',
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
                        'cardText' => $row != null ? $row->Description : '',
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
                        'cardText' => $row != null ? $row['cardText'] : '',
                        'cardName' => $row != null ? $row['cleanName'] : '',
                        'thumbnail' => $row != null ? explode(';', $row['thumbnail']) : '',
                        'color' => $row != null ? $row['color'] : ''
                    ]);
                }
                for ($i = 0; $i < $row['sideDeckQty']; $i++) {
                    array_push($sideDeck, [
                        'cardNumber' => $row != null ? $row['cardNumber'] : '',
                        'cardText' => $row != null ? $row['cardText'] : '',
                        'cardName' => $row != null ? $row['cleanName'] : '',
                        'thumbnail' => $row != null ? explode(';', $row['thumbnail']) : '',
                        'color' => $row != null ? $row['color'] : ''
                    ]);
                }
            }
            return [
                "leader" => $leader,
                "mainDeck" => $mainDeck,
                "sideDeck" => $sideDeck
            ];
        }
        foreach ($deckListArray as $row) {
            for ($i = 0; $i < $row['mainDeckQty']; $i++) {
                array_push($mainDeck, [
                    'cardNumber' => $row != null ? $row['cardNumber'] : '',
                    'cardText' => $row != null ? $row['cardText'] : '',
                    'cardName' => $row != null ? $row['cleanName'] : '',
                    'thumbnail' => $row != null ? explode(';', $row['thumbnail']) : '',
                    'color' => $row != null ? $row['color'] : ''
                ]);
            }
            for ($i = 0; $i < $row['sideDeckQty']; $i++) {
                array_push($sideDeck, [
                    'cardNumber' => $row != null ? $row['cardNumber'] : '',
                    'cardText' => $row != null ? $row['cardText'] : '',
                    'cardName' => $row != null ? $row['cleanName'] : '',
                    'thumbnail' => $row != null ? explode(';', $row['thumbnail']) : '',
                    'color' => $row != null ? $row['color'] : ''
                ]);
            }
        }
        return [
            "leader" => $leader,
            "mainDeck" => $mainDeck,
            "sideDeck" => $sideDeck
        ];
    }

    public function getAllDecks(int $isPublic, string $leaderNumber, int $limit)
    {
        return collect(Proc::callParm('get_deck_lists_all', [
            'isPublic' => $isPublic,
            'leaderCard' => $leaderCardNumber,
            'limit' => $limit
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
                    'imageUrl' => $row != null ? explode(';', $row->imageUrl) : '',
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
                    $key = -1;
                    foreach ($sideDeckList as $key_ => $side) {
                        if ($m->cardNumber === $side->cardNumber) {
                            $key = $key_;
                        }
                    }
                    // $key = array_search($m->cardNumber, array_column($sideDeckList, "cardNumber"));
                    return ($key > -1) ? $sideDeckList[$key]->count : 0;
                })($m, json_decode($deck->sideDeckList))
            ];
        }, json_decode($deck->mainDeckList));
    }
}
