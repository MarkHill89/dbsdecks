import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from './cards';
import { tap } from 'rxjs/operators';
import { CardsStore } from './cards.store';
@Injectable({
  providedIn: 'root'
})

export class CardService {

  private apiUrl: string = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders().set('Access-Control-Allow-Origin','*')
  }

  constructor(
      private http: HttpClient,
      private cardsStore: CardsStore
    ) { }

  getCards(cardFilters: any = {}) : Observable<Card[]> {
    return this.http.post<Card[]>(`${this.apiUrl}/cards`, cardFilters,  this.httpOptions).pipe();
  }

  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/cards/all`, this.httpOptions).pipe(
        tap((data: Card[]) => this.cardsStore.set(data))
    );
  }

  getPrices(productId): Observable<any> {
    return this.http.get(`${this.apiUrl}/cards/prices/${productId}`, this.httpOptions).pipe();
  }
}
