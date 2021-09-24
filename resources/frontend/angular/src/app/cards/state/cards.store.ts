import { Injectable } from '@angular/core';
import { Card } from './card.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface CardsState extends EntityState<Card>{}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'cards', idKey: 'cardNumber'})
export class CardsStore extends EntityStore<CardsState, Card> {
    constructor() {
        super();
    }
    
}

