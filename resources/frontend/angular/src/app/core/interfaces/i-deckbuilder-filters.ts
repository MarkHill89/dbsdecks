import { GroupId } from "../models/deckbuilder-filters/group-id.model";

export interface IDeckbuilderFilters {
    comboEnergy: number[];
    comboPower: number[];
    energyCost: number[];
    groupId: GroupId[];
    power: number[];
    rarity: string[];
}
