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
        "userId",
        "title",
        "isPrivate",
        "isActive",
        "submitDate",
        "leaderNumber",
        "isConverted",
        "shenronID"
    ];
}