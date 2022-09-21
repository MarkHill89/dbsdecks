import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
<<<<<<< HEAD
import { takeUntil, tap, map } from 'rxjs/operators';
import { Deck } from './decks';
import { DecksStoreService } from './decks-store.service';
import { ErrorStoreService } from '../error/error-store.service';
import { LoadingStoreService } from '../loading/loading-store.service';
import { LoadingStatus } from '../loading/loading.model';
=======
import { takeUntil, tap } from 'rxjs/operators';
import { Deck } from './decks';
import { DecksStore } from './decks.store';

>>>>>>> fe1a9b6cb7a1360f2025c63e0b79e162bb5b345c
@Injectable({
  providedIn: 'root'
})
export class DecksService {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  private apiUrl: string = environment.baseUrl;

  private httpOptions = {
<<<<<<< HEAD
    headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'),
    observe: 'response' as 'body'
}
  
  constructor(
      private httpClient: HttpClient,
      private decksStore: DecksStoreService,
      private errorStore: ErrorStoreService,
      private loadingStore: LoadingStoreService
) { }

  getDecks(deckFilters = {}): Observable<any> {
    this.loadingStore.loading = LoadingStatus.DECK_LISTS_LOADING;
    return this.httpClient.get<Deck[]>(`${this.apiUrl}deck/list`, {...this.httpOptions, params : {
      isPublic: 1,
      limit: 10
    }}).pipe(
      takeUntil(this.ngUnsubscribe),
      map(({body} : any) => {
        this.loadingStore.loading = LoadingStatus.IDLE;
        this.decksStore.decks = body;
      })
    );
  }

  findDeck(id: any) : Observable<any> {
    this.loadingStore.loading = LoadingStatus.DECK_LISTS_LOADING;
    return this.httpClient.get<Deck>(`${this.apiUrl}/deck/find/${id}`, this.httpOptions).pipe(
      takeUntil(this.ngUnsubscribe),
      map(({body} : any) => {
        this.loadingStore.loading = LoadingStatus.IDLE;
        this.decksStore.activeDeck = body;
      })
    );
  }

  createDeck(deckInfo: any) {
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.post(`${this.apiUrl}deck/submit`, deckInfo, this.httpOptions).pipe(
      map(({body} : any) => {
        this.decksStore.activeDeck = body;
      })
    )
=======
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
>>>>>>> fe1a9b6cb7a1360f2025c63e0b79e162bb5b345c
  }

  submitDeck(deck: any): Observable<any> {
    if(deck.action === 'edit') {
<<<<<<< HEAD
      return this.httpClient.put<any>(`${this.apiUrl}/deck/submit`, deck, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
    }else {
      return this.httpClient.post<any>(`${this.apiUrl}/deck/submit`, deck, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
=======
      return this.http.put<any>(`${this.apiUrl}/deck/submit`, deck, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
    }else {
      return this.http.post<any>(`${this.apiUrl}/deck/submit`, deck, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
>>>>>>> fe1a9b6cb7a1360f2025c63e0b79e162bb5b345c
    }
  }

  trendingLeaders(): Observable<any> {
<<<<<<< HEAD
    return this.httpClient.get<any>(`${this.apiUrl}/trending/leaders`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  trendingCards(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/trending/cards`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  deleteDeck(deck: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/deck/submit/${deck.id}`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
=======
    return this.http.get<any>(`${this.apiUrl}/trending/leaders`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  trendingCards(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trending/cards`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  deleteDeck(deck: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deck/submit/${deck.id}`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
>>>>>>> fe1a9b6cb7a1360f2025c63e0b79e162bb5b345c
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
