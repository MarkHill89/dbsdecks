import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap, map } from 'rxjs/operators';
import { Deck } from './decks.model';
import { DecksStoreService } from './decks-store.service';
import { ErrorStoreService } from '../error/error-store.service';
import { LoadingStoreService } from '../loading/loading-store.service';
import { LoadingStatus } from '../loading/loading.model';
@Injectable({
  providedIn: 'root'
})
export class DecksService {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  private apiUrl: string = environment.baseUrl;

  private httpOptions = {
    headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'),
    observe: 'response' as 'body'
}
  
  constructor(
      private httpClient: HttpClient,
      private decksStore: DecksStoreService,
      private errorStore: ErrorStoreService,
      private loadingStore: LoadingStoreService
) { }

  getDecks(): Observable<any> {
    return this.httpClient.get<Deck[]>(`${this.apiUrl}deck`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe), map(({body} : any) => body))
  }

  getDeck(id: String): Observable<any> {
    return this.httpClient.get<Deck[]>(`${this.apiUrl}deck/select/${id}`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe), map(({body} : any) => body))
  }

  createDeck(deckInfo: any) {
    if(this.httpOptions.headers.get('Authorization') === null) {
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
   }
    return this.httpClient.post(`${this.apiUrl}deck/submit`, deckInfo, this.httpOptions).pipe(
      takeUntil(this.ngUnsubscribe),
      map(({body} : any) => body)
    )
  }


  trendingLeaders(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/trending/leaders`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  trendingCards(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/trending/cards`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  deleteDeck(deck: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/deck/submit/${deck.id}`, this.httpOptions).pipe(takeUntil(this.ngUnsubscribe));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
