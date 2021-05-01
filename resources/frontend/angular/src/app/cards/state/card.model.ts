import { ID } from '@datorama/akita';

export interface Card {
    id: ID;
    cardCharacter: string;
    cardId ?: string;
    cardLimit: string;
    title: string;
    cardNumber: string;
    description: string;
    cardType: string;
    color: string;
    comboPower: number;
    comboEnergy: number;
    count?: string;
    energyColorCost: string;
    energyCost: string;
    era: string;
    groupId: number;
    thumbnail : string;
    isSuperCombo : boolean;
    isDragonBall : boolean;
    isUltimate : boolean;
    power: string;
    productId: number;
    rarity: string;
    specialTrait: string;    
    url: string;
}

export function createCard(params: Partial<Card>) {
    return {} as Card;
}