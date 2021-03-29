<?php


namespace App\Helpers;


use Illuminate\Support\Facades\DB;

class Proc {

    public static function call(string $procedureName) {

        $str = "call . $procedureName";

        return DB::select($str);

    }
}