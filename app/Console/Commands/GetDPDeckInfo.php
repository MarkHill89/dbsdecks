<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GraphQL\GraphQL;
use GraphQL\Executor\ExecutionResult;
use App\Models\User;


class GetDPDeckInfo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:getDPDeckInfo';

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
        $convertibles = [29459,31103,32141,32191,24275,32165,12508,12544,13060,14439,15189,1571,16518,17171,20256,20314,20314,2036,21798,21833,22023,23710,24001,24373,24565,24648,25068,25098,25341,25841,25958,25964,26677,27045,27166,27693,27790,27790,27827,27859,28161,28686,28955,29225,29237,29363,29653,30096,30120,30297,30315,30356,30513,30970,31083,31137,31199,31366,31501,31513,31737,31766,31983,31989,31996,31999,32011,32091,32107,32111,32116,32117,32121,32124,32125,32127,32129,32134,32136,32137,32138,32139,32140,32142,32143,32146,32147,32149,32152,32154,32155,32159,32163,32164,32166,32170,32174,32181,32192,32195,32196,32199,32202,32203,32204,32205,32208,32209,32210,32212,32215,32216,32238,513,5915,1050];
        $curl = curl_init();
        $apiUrl = 'https://dbs-deckplanet-api.com/graphql';
        $bearer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEzYmRhNzVjLTc0OWUtNDhjOS05ODZmLTE1ZmQ4OGI3NDEzYyIsImlhdCI6MTYzODEzNTM2MSwiZXhwIjoxNjM4NzQwMTYxLCJpc3MiOiJkaXJlY3R1cyJ9.ELLHn8NAhd-cty37Mp55JMKHY_6X5D2RQnnVE8XLOY4';
        foreach($convertibles as $deck){
            curl_setopt_array($curl, array(
                CURLOPT_URL => $apiUrl,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS =>'{"query":"query getDeckByID($deckID: ID!) {\\r\\n    decks_by_id(id: $deckID) {\\r\\n      id\\r\\n      deck_name\\r\\n      user {\\r\\n        username\\r\\n        email\\r\\n      }\\r\\n      deck_cards\\r\\n      side_deck_cards\\r\\n      deck_leader {\\r\\n        card_number\\r\\n        card_front_name\\r\\n        card_back_name\\r\\n      }\\r\\n    }\\r\\n  }","variables":{"deckID":'."$deck".'}}',
                CURLOPT_HTTPHEADER => array(
                    'Accept: application/json',
                    'Authorization: Bearer ' . $bearer,
                    'Content-Type: application/json'
                ),
            ));

            $response = curl_exec($curl);
            $err = curl_error($curl);
            curl_close($curl);
            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                $jsonData = json_decode($response);
            
                $data = $jsonData->data->decks_by_id;
                var_dump($data);
                if($data !== null){
                    $id = $data->id;
                    $userEmail = $data->user->email;
                    $title = $data->deck_name;

                    $user = User::where('email', $userEmail)->first();
                    if($user === null){
                        $userId = 1;
                    } else {
                        $userId = $user->id;
                    }
                    
                    DB::table('deck')->insert(
                        [
                            'userId' => $userId,
                            'title' => $title,
                            'isPrivate' => 1,
                            'isActive' => 1,
                            'submitDate' => now(),
                            'leaderNumber' => $data->deck_leader->card_number,
                            'senronID' => $id
                        ]
                    );

                    $deckId = DB::table('deck')
                        ->select('id')
                        ->orderBy('id', 'desc')
                        ->first();

                    $mainDeck = $data->deck_cards;
                    $sideDeck = $data->side_deck_cards;
                    foreach ($mainDeck as $card) {
                        DB::table('deck_data_new')->updateOrInsert(
                            ['deckId' => $deckId, 'cardNumber' => $card->card_data->card_number],
                            ['mainDeckQty' => $card->amount_in_deck]
                        );
                    }
                    foreach ($sideDeck as $sCard) {
                        DB::table('deck_data_new')->updateOrInsert(
                            ['deckId' => $deckId, 'cardNumber' => $sCard->card_data->card_number],
                            ['mainDeckQty' => $sCard->amount_in_deck]
                        );
                    }
                }
            }
        }
    }
}
