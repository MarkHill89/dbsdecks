import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Deck } from '../api/decks/decks';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  private apiUrl: string = environment.baseUrl;

  private httpOptions = {
    headers: new HttpHeaders().set('Access-Control-Allow-Origin','*')
  }
  
  constructor(private http: HttpClient) { }

  getDecks(deckFilters = {}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/deck`, deckFilters, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  findDeck(id: number) : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/deck/find/${id}`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  submitDeck(deck: Deck): Observable<any> {
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

  deleteDeck(deck: Deck): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deck/submit/${deck.id}`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
