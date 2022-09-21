<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $table = "tcgplayer_card";

    protected $primaryKey = "id";
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
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
        "GTIN",
        "BANDAIDisclaimer",
        "deckbuilder_card_id"
    ];
}