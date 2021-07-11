<?php

namespace App\Http\Controllers;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Http\Request;
use Goutte\Client;
use Illuminate\Support\Facades\DB;

class ScraperController extends Controller
{
    public string $cardName = '';
    public string $cardNumber = '';
    public string $rarity = '';
    public string $cardType = '';
    public string $color = '';
    public string $specialTrait = '';
    public string $power = '0';
    public string $character = '';
    public string $era = '';
    public string $energy = '';
    public int $comboEnergy = 0;
    public int $comboPower = 0;
    public string $skill = '';

    public Crawler $crawler;
    public $array = array();
    public $groupId = "428417";
    public function index()
    {
        $array = array();
        $client = new Client();
        $this->crawler = $client->request('GET', "http://www.dbs-cardgame.com/us-en/cardlist/?search=true&category={$this->groupId}");
        $this->crawler->filter('.list-inner > li')->each(function(Crawler $listInner){

            $listInner->filter('.cardFront')->each(function($cardFront) {
                
                $cardFront->filter('.cardName')->each(function($cardName) {
                $this->cardName = empty($cardName->text()) ? '' : $cardName->text();
                });
                
                $cardFront->filter('.cardNumber')->each(function($cardNumber) {
                    $this->cardNumber = empty($cardNumber->text()) ? '' : $cardNumber->text();
                });
                
                $cardFront->filter('.rarityCol > dd')->each(function($rarity) {
                    $this->rarity = empty($rarity->text()) ? '' : $rarity->text();
                });
                
                $cardFront->filter('.typeCol > dd')->each(function($cardType) {
                    $this->cardType = empty($cardType->text()) ? '' : $cardType->text();
                });
                
                $cardFront->filter('.colorCol > dd')->each(function($color) {
                    $this->color = empty($color->text()) ? '' : $color->text();
                });

                $specialTraitsCol = $cardFront->filter('.specialTraitCol > dd');
                if(count($specialTraitsCol)) {
                    $specialTraitsCol->each(function($specialTrait) {
                        $this->specialTrait = empty($specialTrait->text()) ? '' : $specialTrait->text();
                    });
                }else { 
                    $this->specialTrait = '';
                }
                
                $powerCol = $cardFront->filter('.powerCol > dd');
                if(count($powerCol)) {
                    $powerCol->each(function($power) {
                        $this->power = empty($power->text()) ? '0' : $power->text();
                    });
                } else {
                    $this->power = '0';
                }
                
                $characterCol = $cardFront->filter('.characterCol > dd');
                if(count($characterCol)) {
                    $characterCol->each(function($character) {
                        $this->character = empty($character->text()) ? '' : $character->text();
                    });
                } else {
                    $this->character = '';
                }

                $eraCol = $cardFront->filter('.eraCol > dd');
                if(count($eraCol)) {
                    $eraCol->each(function($era) {
                        $this->era = empty($era->text()) ? '' : $era->text();
                    });
                } else {
                    $this->era = '';
                }

                $energyCol = $cardFront->filter('.energyCol > dd');
                $energyImage = $cardFront->filter('.energyCol > dd > img');
                if(count($energyCol)) {
                    $energyCol->each(function($energy) {
                        $this->energy = empty($energy->text()) ? '' : $energy->text();
                    });
                    if(count($energyImage)) {
                        $energyImage->each(function($energyImage) {
                            $this->energy .= empty($energyImage->attr('src')) ? '' : $energyImage->attr('src');    
                        });
                    }
                } else {
                    $this->energy = '';
                }
                $this->energy = str_replace('../../images/cardlist/common/red_ball.png', 'R', $this->energy);
                $this->energy = str_replace('../../images/cardlist/common/blue_ball.png', 'B', $this->energy);
                $this->energy = str_replace('../../images/cardlist/common/green_ball.png', 'G', $this->energy);
                $this->energy = str_replace('../../images/cardlist/common/yellow_ball.png', 'Y', $this->energy);
                if(strlen($this->energy)) {
                    $this->energy = str_replace(')', '', $this->energy).")";
                }

                $comboEnergyCol = $cardFront->filter('.comboEnergyCol > dd');
                if(count($comboEnergyCol)) {
                    $comboEnergyCol->each(function($comboEnergy) {
                        $this->comboEnergy = empty($comboEnergy->text()) ? 0 : $comboEnergy->text(); 
                    });
                } else {
                    $this->comboEnergy = 0;
                }

                $comboPowerCol = $cardFront->filter('.comboPowerCol > dd');
                if(count($comboPowerCol)) {
                    $comboPowerCol->each(function($comboPower) {
                        $this->comboPower = empty($comboPower->text()) ? 0 : $comboPower->text(); 
                    });
                } else {
                    $this->comboPower = 0;
                }

                $skillCol = $cardFront->filter('.skillCol > dd');
                if(count($skillCol)) {
                    $this->skill = $this->getCardSkillText($skillCol);
                } else {
                    $this->skill = '';
                }
            });
            $cardBackCol = $listInner->filter('.cardBack');
            if(count($cardBackCol)) {
                $cardBackCol->each(function($cardBack) {
                    $cardBack->filter('.cardName')->each(function($cardName) {
                        $text = empty($cardName->text()) ? '' : $cardName->text();
                        $this->cardName .= " // $text";
                        $this->skill .="<br><strong>$text</strong><br>";
                    });
                    $cardBack->filter('.powerCol')->each(function($powerCol) {
                        $power = empty($powerCol->text()) ? '0' : $powerCol->text();
                        $this->power .= "/$power";
                    });
                    $cardBack->filter('.skillCol')->each(function($skillCol) {
                        $this->skill .= $this->getCardSkillText($skillCol);
                    });
                });
            }

            $productId = function() {
                $id = '000000';
                $cn = preg_replace("/[^0-9]/", "", $this->cardNumber );
                $updatedProductId = $id.=$cn;
                return substr($updatedProductId, -6);
            };

            $url = function() {
                $clean = preg_replace("/[\-\:]/", " ", $this->cardName);
                $noAst = preg_replace("/[\'\,]/", "", $clean);
                $removeLeaderSplit = str_replace(" // ", " ", $noAst);
                $noSpaces = str_replace(" ", "-", $removeLeaderSplit);
                $lowerCase = strtolower($noSpaces);
                return "https://store.tcgplayer.com/dragon-ball-super-ccg/supreme-rivalry/$lowerCase";
            };
            
            $cleanName = function() {
                $clean = preg_replace("/[\-\:]/", " ", $this->cardName);
                $noAst = preg_replace("/[\'\,]/", "", $clean);
                $removeLeaderSplit = str_replace(" // ", " ", $noAst);
                return $removeLeaderSplit;
            };
            
            $skill = function() {
                $lt = preg_replace("/ã/", "", $this->skill);
                $gt = preg_replace("/ã/", "", $lt);
                $lb = preg_replace("/ï¼/", "{", $gt);
                $rb = preg_replace("/ï¼/", "}", $lb);
                $ns = preg_replace("/ã»/", "", $rb);
                $na = preg_replace("/â/", "'", $ns);
                return addslashes($na);
            };

            $cardData = [];
            $cardData['name'] = addSlashes($this->cardName);
            $cardData['cleanName'] =  $cleanName();
            $cardData['Rarity'] = preg_replace("/\[\w+\]/", "", $this->rarity);
            $cardData['Number'] = $this->cardNumber;
            $cardData['Description'] = $skill();
            $cardData['CardType'] = ucfirst(strtolower($this->cardType));
            $cardData['Color'] = $this->color;
            $cardData['EnergyColorCost'] = $this->energy;
            $cardData['SpecialTrait'] = $this->specialTrait;
            $cardData['Power'] = $this->power;
            $cardData['ComboPower'] = $this->comboPower;
            $cardData['ComboEnergy'] = $this->comboEnergy;
            $cardData['Era'] = $this->era;
            $cardData['Character'] = $this->character;
            $cardData['productId'] = $productId();
            $cardData['groupId'] = $this->groupId;
            $cardData['url'] = $url();
            $cardData['imageUrl'] = "https://dbs-decks.com/img/{$this->cardNumber}.png";
            if($cardData['CardType'] === "Leader") {
                $cardData['imageUrl'] = $cardData['imageUrl'].";https://dbs-decks.com/img/{$this->cardNumber}_b.png";
            }
            $cardData['GTIN'] = 0;
            DB::table('tcgplayer_card')->upsert($cardData,'groupId');
            array_push($this->array, $cardData);
        });
        
        return json_encode($this->array);
    }

    private function getCardSkillText($skillCol) {
        $doc = new \DOMDocument;
        $doc->loadHTML($skillCol->html());
        $xp = new \DOMXPath($doc);
        foreach ($xp->query('//img') as $node) {
            $text = $doc->createTextNode($node->getAttribute('alt').' ');
            $node->parentNode->replaceChild($text, $node);
        }
        $xpath = new \DOMXPath($doc);
        $node = $xpath->query("//body")->item(0);
        return $node->textContent;
    }
}
