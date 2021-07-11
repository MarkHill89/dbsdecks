<?php


namespace App\Services;

use App\Helpers\Proc;
use Illuminate\Support\Facades\Log;
use Ramsey\Uuid\Type\Integer;

class DataService
{
    public function getAllCards()
    {
        return collect(Proc::call('all_cards'))
        ->map(function ($row) {
            return [
                "title" => $row != null ? $row->cardName: '',
                "cardNumber" => $row != null ? $row->cardNumber: '',
                "rarity" => $row != null ? $row->rarity: '',
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
        return collect(Proc::callParm('get_deck_list_data', [
            'id' => $id
        ]))
        ->map(function ($row) {
            return [
                'cardNumber' => $row != null ? $row->cardNumber : '',
                'cleanName' => $row != null ? $row->cleanName : '',
                'imageUrl' =>$row != null ? $row->imageUrl : '',
                'mainDeckQty' =>$row != null ? $row->mainDeckQty : 0,
                'sideDeckQty' =>$row != null ? $row->sideDeckQty : 0,
            ];
        });
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
                'title' => $row != null ? $row->title : 0,
                'isPrivate' => $row != null ? $row->isPrivate: 0,
                'isActive' => $row != null ? $row->isActive: 0,
                'submitDate' => $row != null ? $row->submitDate: 0,
                'leaderCardNumber' => $row != null ? $row->leaderCardNumber: 0,
                'username' => $row != null ? $row->username:''
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
}