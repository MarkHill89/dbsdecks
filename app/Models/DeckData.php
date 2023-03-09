<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class DeckData extends Model
{
    protected $table = "deck_data_new";

    protected $primaryKey = "id";

    protected $fillable = [
        "deckId",
        "cardNumber",
        "mainDeckQty",
        "sideDeckQty",
        "zDeckQty",
        "id"
    ];
}