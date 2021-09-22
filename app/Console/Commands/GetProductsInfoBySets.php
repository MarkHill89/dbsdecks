<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Helpers\Proc;

class GetProductsInfoBySets extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:getProductsInfoBySets';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This will return all the info for all the cards for each individual set. TCGPlayers limit is set to 10 by defauls and only allow up to 100 results per query. So the limit parameter is added to the url to maximize the output.';

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

        $groupId = 2796; // GroupId for Supreme Rivalry
        $offset = 0;

        $apiUrl = "https://api.tcgplayer.com/catalog/products?groupId=$groupId&limit=100&offset=$offset";

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
            echo $response;
        }

        return "Get Products Information By Sets successfully ran";
    }
}
