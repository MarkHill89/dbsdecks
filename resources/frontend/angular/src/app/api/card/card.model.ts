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
    BANDAIDisclaimer: string
    CardType: String
    Character: String
    Color: String
    ComboEnergy: String
    ComboPower: String
    Description: String
    EnergyColorCost: String
    Era: String
    GTIN: String
    Number: String
    Power: String
    Rarity: String
    SpecialTrait: String
    cleanName: String
    created_at: String
    deckbuilder_card_id: Number
    groupId: Number
    id: Number
    imageUrl: String
    name: String
    productId: Number
    updated_at: String
    url: String
}