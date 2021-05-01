import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { CardsState, CardsStore } from "./cards.store";

@Injectable({providedIn: 'root'})
export class CardsQuery extends QueryEntity<CardsState> {
    cards$ = this.selectAll();
    constructor(protected store: CardsStore) {
        super(store);
    }    
}