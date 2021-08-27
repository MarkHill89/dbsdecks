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
        "isActive",
        "isConverted",
        "isPrivate",
        "leader",
        "leaderCardNumber",
        "submitDate",
        "title",
        "userId"
    ];
}