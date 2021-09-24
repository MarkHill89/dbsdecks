import { IDeck } from "../interfaces/i-deck";
import { Card } from "./card.model";
import { DeckLeader } from "./deck/deck-leader.model";

export class Deck implements IDeck{
    public id: number;
    public deckTitle : string;
    public deckIsPrivate: boolean;
    public deckIsDraft: boolean;
    public deckLeader: DeckLeader;
    public deckListMain: Array<Card>;
    public deckListSide: Array<Card>;
    public deckIsActive: boolean;
    public userId: number;
    public deckSubmitDate: string;
    constructor( ) {}
}
