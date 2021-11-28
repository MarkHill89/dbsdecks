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
        $curl = curl_init();
        $apiUrl = 'https://dbs-deckplanet-api.com/graphql';
        $bearer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEzYmRhNzVjLTc0OWUtNDhjOS05ODZmLTE1ZmQ4OGI3NDEzYyIsImlhdCI6MTYzODEzNTM2MSwiZXhwIjoxNjM4NzQwMTYxLCJpc3MiOiJkaXJlY3R1cyJ9.ELLHn8NAhd-cty37Mp55JMKHY_6X5D2RQnnVE8XLOY4';
        curl_setopt_array($curl, array(
            CURLOPT_URL => $apiUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS =>'{"query":"query getDeckByID($deckID: ID!) {\\r\\n    decks_by_id(id: $deckID) {\\r\\n      id\\r\\n      deck_name\\r\\n      user {\\r\\n        username\\r\\n        email\\r\\n      }\\r\\n      deck_cards\\r\\n      side_deck_cards\\r\\n      deck_leader {\\r\\n        card_number\\r\\n        card_front_name\\r\\n        card_back_name\\r\\n      }\\r\\n    }\\r\\n  }","variables":{"deckID":"23710"}}',
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
