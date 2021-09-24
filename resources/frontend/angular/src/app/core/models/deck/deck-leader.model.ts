import { IDeckLeader } from "../../interfaces/deck/i-deck-leader";

export class DeckLeader implements IDeckLeader{
    public cardCharacter: string;
    public cardId: string;
    public cardLimit: number;
    public cardName: string;
    public cardNumber: string;
    public cardText: string;
    public cardType: string;
    public color: string;
    public comboEnergy: number;
    public comboPower: number;
    public energyColorCost: number;
    public energyCost: string;
    public era: string;
    public groupId: number;
    public imageUrl: string;
    public isDragonball: boolean;
    public isSuperCombo: boolean;
    public isUltimate: boolean;
    public power: number;
    public productId: number;
    public rarity: string;
    public specialTrait: string;
    public url: string;
    constructor() {

    }
}
