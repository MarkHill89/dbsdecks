<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TcgplayerController extends Controller
{
    protected $api_array = array(
        "PUBLIC_KEY" => '5660EAD2-1FC1-4176-B800-CC74B6A1F18B',
        "PRIVATE_KEY" => 'D19C0A8A-9103-4724-9916-79D2675DA85D',
        "ACCESS_TOKEN" => '81D29EAC-899B-4CA7-992D-6E91258F1C62',
        "APPLICATION_ID" => '1703',
        "API_VERSION" => '1.37.0'
    );

    public function index() {

    }

    public function updateCardGroups() {
        if(!session('bearer')){
            $this->requestAuth();
        }
        session_write_close();
        $endpoint = "v".$this->api_array['API_VERSION']."/catalog/categories/27/groups";
        $query = [
            "offset" => 0,
            "limit" => 100
        ];
        $result = $this->makeApiCall($endpoint, "GET", $query);
        $data = json_decode($result);
        foreach($data->results as $row) {
            print_r($row);
        }
    }

    private function requestAuth() {
        $client = new \GuzzleHttp\Client(['headers' => [
            "X-Tcg-Access-Token" => $this->api_array['ACCESS_TOKEN'],
            "Content-Type" => "application/x-www-form-urlencoded"
        ]]);
        $response = $client->request("POST", "https://api.tcgplayer.com/token", [
            'query' => [
                "grant_type" => "client_credentials",
                "client_id" => $this->api_array['PUBLIC_KEY'],
                "client_secret" => $this->api_array["PRIVATE_KEY"]
            ]
        ]);

        $statusCode = $response->getStatusCode();
        $content = $response->getBody();

        session(['bearer' => json_decode($content)]);
        session_write_close();
    }

    private function makeApiCall($endpoint, $request_type, $query){
        $client = new \GuzzleHttp\Client();
        $response = $client->response($request_type, "https://api.tcgplayer.com/".$endpoint, [
            'headers' => [
                "Accept" => "application/json",
                "Authorization" => "bearer ".session('bearer')->access_token
            ],
            'query' => $query
        ]);
        
        $statusCode = $response->getStatusCode();
        $content = $response->getBody();

        return $content;
    }
    
}
