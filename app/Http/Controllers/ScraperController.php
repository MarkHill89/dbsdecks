<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use Goutte\Client;
use App\Models\Dbs\DbsCard;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use App\Helpers\TCGHelpers;

class ScraperController extends Controller {

    public Crawler $crawler;
    public $array = array();
    private $cardData = array();
    private $cardId = 0;
    private $imageDir = "";
    public function __construct() {
    }

    public function pull(Request $request) {

        $response = Http::get('https://api.bandai-tcg-plus.com/api/user/card/list', [
            'card_set[]' => 534,
            'game_title_id' => 1,
            'limit' => 500,
            'offset' => 0
        ]);

        if($response->failed()) {
            return $response->status();
        } else {
            $cards = $response->object()->success->cards;

            foreach($cards as $card) {
                $this->cardId = (int) $card->id;
                $cardResponse = Http::get("https://api.bandai-tcg-plus.com/api/user/card/{$this->cardId}");
                if($cardResponse->failed()) {
                    return $cardResponse->failed();
                   
                } else {
                    $cardObject = $cardResponse->object()->success->card;
                    if(DbsCard::where("Number", $cardObject->card_number)->exists()) {
                        continue;
                    }

                    $cardConfig = $this->decodeCardConfig($cardObject->card_config);

                    $this->imageDir = explode("-", $cardObject->card_number)[0];
                    $handle = fopen("php://memory", "rw");
                    $image = imagecreatefromstring(file_get_contents($cardObject->image_url));
                    imagepalettetotruecolor($image);
                    imagewebp($image, $handle);
                    imagedestroy($image);
                    rewind($handle);
                    Storage::disk('ftp')->put("/{$this->imageDir}/{$cardObject->card_number}.webp", $handle);
                    fclose($handle);

                    $this->cardData = array(
                        "name" => $cardObject->card_name,
                        "cleanName" =>  $cardObject->card_name,
                        "Rarity" => $cardConfig["Rarity"],
                        "Number" => $cardObject->card_number,
                        "Description" => isset($cardObject->card_text) ? $cardObject->card_text : "",
                        "CardType" => $cardConfig["CardType"],
                        "Color" => $cardConfig["Color"],
                        "EnergyColorCost" => $cardConfig["Energy"] == 0 ? 0 : $cardConfig["Energy"]."({$cardConfig['ColorCost']})",
                        "SpecialTrait" => !is_string($cardConfig["SpecialTrait"]) || empty($cardConfig["SpecialTrait"]) ? "" : $cardConfig["SpecialTrait"],
                        "Power" => !is_int($cardConfig["Power"]) || empty($cardConfig["Power"]) ? 0 : $cardConfig["Power"],
                        "ComboPower" => !is_int($cardConfig["ComboPower"]) || empty($cardConfig["ComboPower"]) ? 0 : $cardConfig["ComboPower"],
                        "ComboEnergy" => !is_int($cardConfig["ComboEnergy"]) || empty($cardConfig["ComboEnergy"]) ? 0 : $cardConfig["ComboEnergy"],
                        "Character" => !is_string($cardConfig["Character"]) || empty($cardConfig["Character"]) ? "" : $cardConfig["Character"],
                        "Era" => !is_string($cardConfig["Era"]) || empty($cardConfig["Era"]) ?  "" : $cardConfig["Era"],
                        "url" => "https://store.tcgplayer.com/dragon-ball-super-ccg",
                        "imageUrl" => "https://ndg-cdn.com/images/dbs/{$this->imageDir}/{$cardObject->card_number}.webp",
                        "groupId" => "123456",
                        "productId" => str_replace("-", "", $cardObject->card_number),
                        "GTIN" => 0
                    );

                    if($this->cardData["CardType"] === "Leader") {
                        $this->cardId = $this->cardId + 1;
                        $leaderResponse = Http::get("https://api.bandai-tcg-plus.com/api/user/card/{$this->cardId}");
                        if($leaderResponse->failed()) {
                            continue;
                        } else {
                            $leaderObject = $leaderResponse->object()->success->card;

                            $this->imageDir = explode("-", $leaderObject->card_number)[0];
                            $handle = fopen("php://memory", "rw");
                            $image = imagecreatefromstring(file_get_contents($leaderObject->image_url));
                            imagepalettetotruecolor($image);
                            imagewebp($image, $handle);
                            imagedestroy($image);
                            rewind($handle);
                            Storage::disk('ftp')->put("/{$this->imageDir}/{$leaderObject->card_number}_b.webp", $handle);
                            fclose($handle);
                            $leaderConfig = $this->decodeCardConfig($leaderObject->card_config);
                            $this->cardData["name"] = $this->cardData["name"]." // ".$leaderObject->card_name;
                            $this->cardData["Description"] = $this->cardData["Description"]."<br>"."<b>{$leaderObject->card_name}</b><br>{$leaderObject->card_text}";
                            $this->cardData["Power"] = $this->cardData["Power"]."/".$leaderConfig["Power"];
                            $this->cardData["imageUrl"] = $this->cardData["imageUrl"].";https://ndg-cdn.com/images/dbs/{$this->imageDir}/{$leaderObject->card_number}_b.webp";
                        }
                    }
                    if(isset($this->cardData["Description"])){
                        $this->cardData["Description"] = str_replace("　", "", $this->cardData["Description"]);
                        $this->cardData["Description"] = str_replace("《", "&#8810;", $this->cardData["Description"]);
                        $this->cardData["Description"] = str_replace("》", "&#8811;", $this->cardData["Description"]);
                        $this->cardData["Description"] = str_replace("１", "1", $this->cardData["Description"]);
                        $this->cardData["Description"] = str_replace("２", "2", $this->cardData["Description"]);
                        $this->cardData["Description"] = str_replace("・", "&#183;", $this->cardData["Description"]);
                        $this->cardData["Description"] = str_replace("―", "-", $this->cardData["Description"]);
                        $this->cardData["Description"] = str_replace("[", "[", $this->cardData["Description"]);
                    }
                    $this->cardData["EnergyColorCost"] = str_replace("Ｘ", "X", $this->cardData["EnergyColorCost"]);
                    $this->cardData["productId"] = str_replace("BT", "", $this->cardData["productId"]);
                    $this->cardData["productId"] = str_replace("SD", "", $this->cardData["productId"]);
                    $this->cardData["productId"] = str_replace("P", "", $this->cardData["productId"]);
                    $this->cardData["productId"] = str_replace("EX", "", $this->cardData["productId"]);

                    $dbsCard = DbsCard::create($this->cardData);
                    $dbsCard->save();
                    array_push($this->array, $cardObject->card_number." has been created");
                }
            }
        }

        return $this->array;
    }

    private function decodeCardConfig($cardConfig) {
        $configObject = array();

        $rarities = array(
            "SCR" => "Secret Rare",
            "Secret Rare[SCR]" => "Secret Rare",
            "SPR" => "Special Rare",
            "SR" => "Super Rare",
            "Super Rare[SR]" => "Super Rare",
            "R" => "Rare",
            "Rare[R]" => "Rare",
            "UC" => "Uncommon",
            "Uncommon[UC]" => "Uncommon",
            "C" => "Common",
            "Common[C]" => "Common",
            "ST" => "Starter Rare",
            "PR" => "Promotion",
            "Promotion[PR]" => "Promotion",
            "EX" => "Expansion Rare",
            "Expansion Rare[EX]" => "Expansion Rare"
        );
        
        foreach($cardConfig as $config) {
            switch($config->config_name) {
                case "Type": 
                    $configObject["CardType"] = ucfirst(strtolower($config->value));
                    break;
                case "Color":
                    $configObject["Color"] = $config->value;
                    break;
                case "Character":
                    $configObject["Character"] = isset($config->value) ? trim(str_replace("　", "", $config->value)) : "";
                    break;
                case "Rarity":
                    $configObject["Rarity"] = isset($config->value) ? trim($rarities[str_replace("　", "", $config->value)]) : "";
                    break;
                case "Energy":
                    $configObject["Energy"] = isset($config->value) ? trim(str_replace("　", "", $config->value)) : 0;
                    break;
                case "Color Cost":
                    if(isset($config->value)) {
                        $colorCost = str_replace("(Red)", "R", $config->value);
                        $colorCost = str_replace("(Blue)", "B", $colorCost);
                        $colorCost = str_replace("(Green)", "G", $colorCost);
                        $colorCost = str_replace("(Yellow)", "Y", $colorCost);
                        $colorCost = str_replace("(Black)", "K", $colorCost);
                        $colorCost = str_replace("　", "", $colorCost);
                        $configObject["ColorCost"] = $colorCost;
                    } else {
                        $configObject["ColorCost"] = 0;
                    }
                    break;
                case "Combo Energy":
                    $configObject["ComboEnergy"] = isset($config->value) ? trim(str_replace("　", "", $config->value)) : 0;
                    break;
                case "Combo power":
                case "Combo Power":
                    $configObject["ComboPower"] = isset($config->value) ? trim(str_replace("　", "", $config->value)) : 0;
                    break;
                case "Power":
                    $configObject["Power"] = isset($config->value) ? trim(str_replace("　", "", $config->value)) : 0;
                    break;
                case "Special Trait":
                    $configObject["SpecialTrait"] = isset($config->value) ? trim(str_replace("　", "", $config->value)) : "";
                    break;
                case "Era":
                    $configObject["Era"] = isset($config->value) ? trim(str_replace("　", "", $config->value)) : "";
                    break;
            }
        }
        return $configObject;
    }
}