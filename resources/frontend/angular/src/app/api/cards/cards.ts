export interface Card {
    cardCharacter: string;
    cardId ?: string;
    cardLimit: string;
    cardName: string;
    cardNumber: string;
    cardText: string;
    cardType: string;
    color: string;
    comboPower: number;
    comboEnergy: number;
    count?: string;
    energyColorCost: string;
    energyCost: string;
    era: string;
    groupId: number;
    imageUrl : string[];
    isSuperCombo : boolean;
    isDragonBall : boolean;
    isUltimate : boolean;
    power: string;
    productId: number;
    rarity: string;
    specialTrait: string;    
    url: string;
}

export interface CardState {
    cards: Card[];
    filters: any;
    totalPages: number;
}