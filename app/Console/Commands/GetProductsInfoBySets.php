<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Helpers\Proc;
use Illuminate\Support\Facades\DB;

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
    protected $description = 'This will return all the info for all the cards for each individual set. TCGPlayers limit is set to 100 by default and only allow up to 100 results per query. So the limit parameter is added to the url to maximize the output.';

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
            $apiUrl = "https://api.tcgplayer.com/catalog/products?groupId=$groupId&getExtendedFields=true&limit=100&offset=$offset";

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
                $totalItems = $jsonData->totalItems;

                while ($totalItems >= 0) {
                    $apiUrl = "https://api.tcgplayer.com/catalog/products?groupId=$groupId&getExtendedFields=true&limit=100&offset=$offset";

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

                    $setResponse = curl_exec($curl);
                    $err = curl_error($curl);
                    $jsonSetData = json_decode($setResponse);
                    $data =  $jsonSetData->results;

                    foreach ($data as $product) {
                        $productId = $product->productId ? $product->productId : '';
                        $groupId = $product->groupId ? $product->groupId : '';

                        $productName = null;
                        $cleanName = null;
                        $url = null;
                        $imageUrl = null;
                        $rarity = null;
                        $number = null;
                        $description = null;
                        $cardType = null;
                        $color = null;
                        $specialTrait = null;
                        $power = null;
                        $era = null;
                        $character = null;
                        $energyColorCost = null;
                        $comboPower = null;
                        $comboEnergy = null;
                        $gtin = null;
                        $disclaimer = null;

                        $productName = $product->name ? $product->name : '';
                        $cleanName = $product->cleanName ? $product->cleanName : '';
                        $url = $product->url ? $product->url : '';
                        $imageUrl = $product->imageUrl ? $product->imageUrl : '';

                        foreach ($product->extendedData as $extendedData) {
                            if ($extendedData->name === "Rarity") {
                                $rarity = $extendedData->value;
                            } elseif ($extendedData->name === "Number") {
                                $number = $extendedData->value;
                            } elseif ($extendedData->name === "Description") {
                                $description = $extendedData->value;
                            } elseif ($extendedData->name === "CardType") {
                                $cardType = $extendedData->value;
                            } elseif ($extendedData->name === "Color") {
                                $color = $extendedData->value;
                            } elseif ($extendedData->name === "SpecialTrait") {
                                $specialTrait = $extendedData->value;
                            } elseif ($extendedData->name === "Power") {
                                $power = $extendedData->value;
                            } elseif ($extendedData->name === "Era") {
                                $era = $extendedData->value;
                            } elseif ($extendedData->name === "Character") {
                                $character = $extendedData->value;
                            } elseif ($extendedData->name === "EnergyColor Cost") {
                                $energyColorCost = $extendedData->value;
                            } elseif ($extendedData->name === "Combo Power") {
                                $comboPower = $extendedData->value;
                            } elseif ($extendedData->name === "Combo Energy") {
                                $comboEnergy = $extendedData->value;
                            } elseif ($extendedData->name === "GTIN") {
                                $gtin = $extendedData->value;
                            } elseif ($extendedData->name === "BANDAIDisclaimer") {
                                $disclaimer = $extendedData->value;
                            }
                        }

                        DB::table('tcgplayer_card_dupetest')
                            ->updateOrInsert(
                                ['productId' => $productId, 'groupId' => $groupId],
                                [
                                    'name' => $productName,
                                    'cleanName' => $cleanName,
                                    'url' =>  $url,
                                    'imageUrl' =>  $imageUrl,
                                    'Rarity' =>  $rarity,
                                    'Number' =>  $number,
                                    'Description' =>  $description,
                                    'CardType' =>  $cardType,
                                    'Color' =>  $color,
                                    'SpecialTrait' =>   $specialTrait,
                                    'Power' =>  $power,
                                    'Era' =>  $era,
                                    'Character' =>  $character,
                                    'EnergyColorCost' =>  $energyColorCost,
                                    'ComboPower' =>  $comboPower,
                                    'ComboEnergy' =>  $comboEnergy,
                                    'GTIN' =>  $gtin,
                                    'BANDAIDisclaimer' =>  $disclaimer,
                                ]
                            );
                        echo "inserted data for $cleanName in $groupId ";
                    }


                    $totalItems = $totalItems - 100;
                    if ($totalItems > 0) {
                        $offset = $offset + 100;
                    } else {
                        $offset = 0;
                    }
                }
            }
        }

        curl_close($curl);

        return "Get Products Information By Sets successfully ran";
    }
}
