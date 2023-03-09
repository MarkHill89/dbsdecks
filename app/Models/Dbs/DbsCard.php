<?php

namespace App\Models\Dbs;

use Illuminate\Database\Eloquent\Model;

class DbsCard extends Model { 
    protected $table = "tcgplayer_card";

    protected $primaryKey = "id";

    protected $fillable = [
        "id",
        "name",
        "cleanName",
        "Rarity",
        "Number",
        "Description",
        "CardType",
        "Color",
        "EnergyColorCost",
        "SpecialTrait",
        "Power",
        "ComboPower",
        "ComboEnergy",
        "Era",
        "Character",
        "productId",
        "groupId",
        "url",
        "imageUrl",
        "GTIN"
    ];
}