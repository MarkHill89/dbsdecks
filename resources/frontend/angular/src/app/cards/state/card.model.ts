import { ID } from '@datorama/akita';

export interface Card {
    id: ID;
    cardCharacter: string;
    cardId ?: string;
    cardLimit: number;
    title: string;
    cardName: string;
    cardNumber: string;
    character: string;
    description ?: string;
    cardText: string;
    cardType: string;
    color: string;
    comboPower: number;
    comboEnergy: number;
    count?: string;
    leaderName?: string;
    energyColorCost: string;
    energyCost: number;
    era: string;
    groupId: number;
    thumbnail : string [];
    isSuperCombo : boolean;
    isDragonBall : boolean;
    isUltimate : boolean;
    power: string;
    productId: number;
    rarity: string;
    specialTrait: string;    
    url: string;
    qty?: number;
    imageUrl ?: string[] | undefined;
    price : number;
} 

export function createCard(params: Partial<Card>) {
    return {} as Card;
}