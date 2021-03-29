<?php


namespace App\Helpers;


use Illuminate\Support\Facades\DB;

class Proc {

    public static function call(string $procedureName, array $parms) {

        $str = "call . $procedureName";

        return DB::select($str, $parms);

    }
}