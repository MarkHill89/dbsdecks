import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from './card.model';
import { CardStoreService } from './card-store.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
    
    private url = environment.baseUrl;
    private httpOptions = {
        headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'),
        observe: 'response' as 'body'
    }
  
    constructor(
        private httpClient: HttpClient,
        private cardStore: CardStoreService
    ) { }

    getCards(cardFilters: any) {
        return this.httpClient.post(`${this.url}/card`, cardFilters, this.httpOptions).pipe(
            map(({body} : any) => body)
        )
    }

    getLeaderCards(cardName: string) {
        return this.httpClient.get(`${this.url}card/byName`, {...this.httpOptions, params : {
            cardName
        }}).pipe(map(({body} : any) => {
            this.cardStore.leaders = body;
        }))
    }

    getPrices(productId: Number): Observable<any> {
        return this.httpClient.get(`${this.url}/cards/prices/${productId}`, this.httpOptions).pipe();
    }
}