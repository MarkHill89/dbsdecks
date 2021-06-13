import { Query } from '@datorama/akita';
import { DeckState, DeckStore } from './deck-builder.store';

export class DeckQuery extends Query<DeckState> {
    deck$ = this.select();

    constructor(protected store: DeckStore) {
        super(store)
    }

    get isDeckStored() {
        return this.getValue().mainDeck.length > 0;
    }
}