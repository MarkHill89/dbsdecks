<?php


namespace App\Helpers;


use Illuminate\Support\Facades\DB;

class Proc {

    public static function call(string $procedureName) {

        $str = "call $procedureName";

        return DB::select($str);

    }

    public static function callParm(string $procedureName, array $parms) {

        $str = "call " . $procedureName . '(  :' . join(', :', array_keys($parms)) . ')';

        return DB::select($str, $parms);

    }
}