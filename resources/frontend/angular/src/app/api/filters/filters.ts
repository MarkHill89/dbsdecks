export interface Filters {
    cardSet: CardSetFilter[];
    rarity: string[];
    power: string[];
    energyCost: any[];
    specialTrait: string[];
    comboPower: string[];
    comboEnergy: string[];
    character: string[];
    leader: LeaderFilter[];
}

export interface CardSetFilter {
    groupId: number | string;
    setName: string;
}

export interface LeaderFilter {
    cardName: string;
    cardNumber: string;
}