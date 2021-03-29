<?php


namespace App\Services;

use App\Helpers\Proc;
use Illuminate\Support\Facades\Log;

class DataService
{
    public function getAllCards(){
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
}