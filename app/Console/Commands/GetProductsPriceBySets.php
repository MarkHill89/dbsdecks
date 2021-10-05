<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Helpers\Proc;
use Illuminate\Support\Facades\DB;

class GetProductsPriceBySets extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:getProductsPriceBySets';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This will return all the price for all the cards for each individual set. TCGPlayers limit is set to 100 by default and only allow up to 100 results per query. So the limit parameter is added to the url to maximize the output.';

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

        $groupIds = DB::table('tcgplayer_group')
            ->select('groupId')
            ->get();

        $offset = 0;

        foreach ($groupIds as $setId) {
            $groupId = $setId->groupId;

            $apiUrl = "https://api.tcgplayer.com/pricing/group/$groupId?limit=1&offset=$offset";

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

            if ($err) {
                echo "cURL Error #:" . $err;
            } else {
                $jsonData = json_decode($response);
                $data = $jsonData->results;

                foreach ($data as $product) {
                    DB::table('tcgplayer_price_dupetest')
                        ->updateOrInsert(
                            ['productId' => $product->productId],
                            [
                                'lowPrice' => $product->lowPrice,
                                'midPrice' => $product->midPrice,
                                'highPrice' => $product->highPrice,
                                'marketPrice' => $product->marketPrice,
                                'directLowPrice' => $product->directLowPrice,
                                'subTypeName' => $product->subTypeName,
                                'updateDate' => now()

                            ]
                        );
                    echo "added price for $product->productId ";
                }
            }
        }

        curl_close($curl);

        return "Get Products By Sets successfully ran";
    }
}
