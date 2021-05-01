import { StoreConfig, EntityState, EntityStore, QueryEntity,Query, Store } from '@datorama/akita';
import { Deck } from './decks';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface DecksState extends EntityState<Deck> {}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'deck-store', idKey: '_id'})
export class DecksStore extends Store<Deck> {
    constructor() {
        super({});
    }
}

@Injectable({ providedIn: 'root' })
export class DecksQuery extends Query<DecksState> {
    deck$ = this.select();
    constructor(protected store: DecksStore) {
        super(store);
    }
}

