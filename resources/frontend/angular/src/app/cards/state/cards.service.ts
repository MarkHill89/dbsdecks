import { Injectable } from "@angular/core";
import { CardsStore } from "./cards.store";
import { HttpClient } from '@angular/common/http';
import { environment } from "@dbsdecks/environments/environment"
import { Card } from "./card.model";
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class CardsService {
    private baseUrl: string = environment.baseUrl;
    constructor(private cardsStore: CardsStore, private http: HttpClient) { }

    get() {
        return this.http.get<Card[]>(this.baseUrl + "card").pipe(tap(cards => this.cardsStore.set(cards)))
    }
}