<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deck extends Model
{
    protected $table = "deck";

    protected $primaryKey = "id";
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "id",
<<<<<<< HEAD
        "userId",
        "title",
        "isPrivate",
        "isActive",
        "submitDate",
        "leaderNumber",
        "isConverted",
        "shenronID"
=======
        "leader",
        "isActive",
        "isConverted",
        "isPrivate",
        "leaderCardNumber",
        "submitDate",
        "title",
        "userId",
        "leaderNumber"
>>>>>>> fe1a9b6cb7a1360f2025c63e0b79e162bb5b345c
    ];
}