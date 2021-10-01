<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Helpers\Proc;
use Illuminate\Support\Facades\DB;

class GetSetsInfo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:getSetsInfo';

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

        $publicKey = env('TCGPLAYER_PUBLIC');
        $privateKey = env('TCGPLAYER_PRIVATE');
        $authData = "grant_type=client_credentials&client_id=$publicKey&client_secret=$privateKey";
        $bearerToken = Proc::getTcgBearerToken();

        $categoryId = 27; //ID for DBS
        $offset = 0;


        $apiUrl = "https://api.tcgplayer.com/catalog/categories/$categoryId/groups?limit=100&offset=$offset";

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
                "Accept: application/json",
                "Authorization: bearer $bearerToken"
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
                DB::table('tcgplayer_group')
                    ->updateOrInsert(
                        ['groupId' => $result->groupId],
                        [
                            'name' => $result->name,
                            'abbreviation' => $result->abbreviation,
                            'isSupplemental' => $result->isSupplemental,
                            'publishedOn' => $result->publishedOn,
                            'modifiedOn' => $result->modifiedOn,
                            'categoryId' => $result->categoryId,
                        ]
                    );
            }
        }

        return "set information is complete ";
    }
}
