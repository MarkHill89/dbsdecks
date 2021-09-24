import { IDeckbuilderFilters } from "../interfaces/i-deckbuilder-filters";
import { GroupId } from "./deckbuilder-filters/group-id.model";

export class DeckbuilderFilters implements IDeckbuilderFilters{
    
    public comboEnergy: number[];
    public comboPower: number[];
    public energyCost: number[];
    public groupId: GroupId[];
    public power: number[];
    public rarity: string[];
    
    constructor(){

    }
}
