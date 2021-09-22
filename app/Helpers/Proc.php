<?php


namespace App\Helpers;


use Illuminate\Support\Facades\DB;

class Proc
{

    public static function call(string $procedureName)
    {

        $str = "call $procedureName";

        return DB::select($str);
    }

    public static function callParm(string $procedureName, array $parms)
    {

        $str = "call " . $procedureName . '(  :' . join(', :', array_keys($parms)) . ')';

        return DB::select($str, $parms);
    }

    public static function getTcgBearerToken()
    {
        $curl = curl_init();

        $publicKey = env('TCGPLAYER_PUBLIC');
        $privateKey = env('TCGPLAYER_PRIVATE');
        $authData = "grant_type=client_credentials&client_id=$publicKey&client_secret=$privateKey";
        $apiUrl = "https://api.tcgplayer.com/token";

        curl_setopt_array($curl, [
            CURLOPT_URL => $apiUrl,
            CURLOPT_POSTFIELDS => $authData,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_HTTPHEADER => [
                "Accept: application/x-www-form-urlencoded"
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            $resObject = json_decode($response);
        }

        return $resObject->access_token;
    }
}
