import { DeckStore } from './deck-builder.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class DeckService {
    constructor(private deckStore: DeckStore) {}

    updateDeck(deck: any) {
        this.deckStore.update(deck);
    }
}