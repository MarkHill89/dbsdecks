import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Deck } from './decks';
import { DecksStore } from './decks.store';

@Injectable({
  providedIn: 'root'
})
export class DecksService {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  private apiUrl: string = environment.baseUrl;

  private httpOptions = {
    headers: new HttpHeaders().set('Access-Control-Allow-Origin','*')
  }
  
  constructor(
      private http: HttpClient,
      private readonly deckStore: DecksStore
) { }

  getDecks(deckFilters = {}): Observable<any> {
    return this.http.post<Deck[]>(`${this.apiUrl}/deck`, deckFilters, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  findDeck(id: any) : Observable<any> {
    return this.http.get<Deck>(`${this.apiUrl}/deck/find/${id}`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  submitDeck(deck: any): Observable<any> {
    if(deck.action === 'edit') {
      return this.http.put<any>(`${this.apiUrl}/deck/submit`, deck, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
    }else {
      return this.http.post<any>(`${this.apiUrl}/deck/submit`, deck, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
    }
  }

  trendingLeaders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trending/leaders`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  trendingCards(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trending/cards`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  deleteDeck(deck: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deck/submit/${deck.id}`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
