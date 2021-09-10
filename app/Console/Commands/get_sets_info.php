<?php

$curl = curl_init();

$publicKey = 'ENTERPUBLICKEY';
$privateKey = 'ENTERPRIVATEKEY';
$authData = "grant_type=client_credentials&client_id=$publicKey&client_secret=$privateKey";
$bearerToken = "GRAB_BEARER_TOKEN_FROM_auth_tcgplayer_script";

$categoryId = 27; //ID for DBS
$groupId = 2720;
$offset = 0;
$productId = 0;

$apiUrl = "https://api.tcgplayer.com/catalog/categories/$categoryId/groups";

curl_setopt_array($curl, [
    CURLOPT_URL => $apiUrl,
    CURLOPT_POSTFIELDS => $authData,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
        "Accept: application/x-www-form-urlencoded",
        "Authorization: bearer $bearerToken"
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
