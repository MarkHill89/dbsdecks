import { Store, StoreConfig } from '@datorama/akita';
import { Card } from '../../cards/state/card.model';
import { Injectable } from '@angular/core';

export interface DeckState {
    title: string;
    leader: Card;
    mainDeck: Card[];
    sideDeck: Card[];
}

export function createInitialState(): DeckState {
    return {
        title: '',
        leader: {} as Card,
        mainDeck: [] as Card[],
        sideDeck: [] as Card[]
    }
}

@Injectable({ providedIn: 'root'})
@StoreConfig({name: 'deck'})
export class DeckStore extends Store<DeckState> {
    constructor() {
        super(createInitialState());
    }
}