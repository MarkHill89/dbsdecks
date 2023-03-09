export interface Card {
    name: String;
    rarity: String;
    text: String;
    cardType: String;
    color: String;
    cost: String;
    specialTrait : String;
    power: String;
    comboPower: String;
    comboEnergy: String;
    era: String;
    cardCharacter: String;
    url: String;
    imageUrl: String;
    cardNumber: String;
    mainDeckQty: number;
    sideDeckQty: number;
    zDeckQty: number;
}

export interface LeaderCard {
    Number: String
    imageUrl: String
    name: String
}