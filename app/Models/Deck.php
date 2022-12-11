<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

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
        "shenronID",
        "username"
    ];

    public function user() {
        return $this->hasOne(User::class, 'id', 'userId');
    }

}