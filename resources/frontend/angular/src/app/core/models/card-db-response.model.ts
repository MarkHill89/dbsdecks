import { Card } from "./card.model";

export class CardDBResponse {
    public cards: Card[];
    public totalCards: Number;
    public cardFilters: any = {};
    constructor(
        
    ) {}
}
