import { Card } from "../models/card.model";
import { DeckLeader } from "../models/deck/deck-leader.model";

export interface IDeck {
    id: number;
    deckTitle : string;
    deckIsPrivate: boolean;
    deckIsDraft: boolean;
    deckLeader: DeckLeader;
    deckListMain: Array<Card>;
    deckListSide: Array<Card>;
    deckIsActive: boolean;
    userId: number;
    deckSubmitDate: string;
}
