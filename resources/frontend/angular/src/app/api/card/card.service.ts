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

    getCards() {
        return this.httpClient.get(`${this.url}card/nonleaders`, this.httpOptions).pipe(
            map(({body} : any) => body)
        )
    }

    getLeaderCards() {
        return this.httpClient.get(`${this.url}card/leaders`, this.httpOptions).pipe(
            map(({body} : any) => body)
        )
    }

    getPrices(productId: Number): Observable<any> {
        return this.httpClient.get(`${this.url}/cards/prices/${productId}`, this.httpOptions).pipe();
    }
}