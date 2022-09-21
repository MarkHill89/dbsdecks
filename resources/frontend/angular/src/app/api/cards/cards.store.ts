import { StoreConfig, EntityState, EntityStore, QueryEntity } from '@datorama/akita';
import { Card } from './cards';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface CardsState extends EntityState<Card> {}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'card-store', idKey: 'cardNumber'})
export class CardsStore extends EntityStore<CardsState> {
    constructor() {
        super();
    }
}

@Injectable({ providedIn: 'root' })
export class CardsQuery extends QueryEntity<CardsState> {
    cards$: Observable<Card[]> = this.selectAll();
    constructor(protected store: CardsStore) {
        super(store);
    }
}

