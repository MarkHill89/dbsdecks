export interface Card {
    cardCharacter: String;
    cardLimit: Number;
    name: String;
    cardNumber: String;
    cardText: String;
    cardType: String;
    color: String;
    comboEnergy: String;
    comboPower: String;
    energyCost: Number;
    era: String;
    isDragonBall: Number;
    isSuperCombo: Number;
    isUltiamte: Number;
    power: String;
    rarity: String;
    specialTrait: String;
    thumbnail: String[];
    imageUrl: String;
    url: String;
}

export interface LeaderCard {
    Number: String
    imageUrl: String
    name: String
}