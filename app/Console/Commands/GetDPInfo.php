<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;


class GetDPInfo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:getDPInfo';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This returns all the basic information for DBS sets. TCGPlayers limit is set to 10 by defauls and only allow up to 100 results per query. So the limit parameter is added to the url to maximize the output.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $curl = curl_init();

        $bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEzYmRhNzVjLTc0OWUtNDhjOS05ODZmLTE1ZmQ4OGI3NDEzYyIsImlhdCI6MTYzNzEwMzg1MCwiZXhwIjoxNjM3NzA4NjUwfQ.ES7dO56cl859yV1hGs93cBx-w50o5RbFBG5TQCfQxj0';


        $apiUrl = "https://dbs-deckplanet-api.com/items/decks?limit=50000&sort=sort,-date_created&page=1&search=&filter={%22_and%22:[{%22is_private%22:{%22_neq%22:false}},{},{},{},{%22_or%22:[{%22deck_name%22:{%22_nempty%22:true}},{%22deck_name%22:{%22_nempty%22:true}},{%22user%22:{%22username%22:{%22_nempty%22:true}}},{%22user%22:{%22username%22:{%22_nempty%22:true}}}]},{%22_or%22:[{%22deck_leader%22:{%22card_color%22:{%22_nempty%22:true}}}]}]}&meta=filter_count&fields=id,date_created,deck_name,deck_leader.card_front_name,deck_leader.card_back_name,user.username,user.email";

        curl_setopt_array($curl, [
            CURLOPT_URL => $apiUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => [
                "Accept: application/json",
                "Authorization: Bearer $bearerToken"
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            $jsonData = json_decode($response);
            foreach ($jsonData->results as $result) {
                echo $result;
            }
        }

        return "all recent decks ";
    }
}
