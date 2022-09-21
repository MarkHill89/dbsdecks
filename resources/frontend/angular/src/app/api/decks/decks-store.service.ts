import { Injectable } from '@angular/core';
import { Deck } from './decks';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecksStoreService {

  private readonly _decks = new BehaviorSubject<Deck[]>([] as Deck[])
  readonly decks$ = this._decks.asObservable();

  private readonly _activeDeck = new BehaviorSubject<Deck>({} as Deck);
  readonly activeDeck$ = this._activeDeck.asObservable();

  constructor() { }

  get decks() {
    return this._decks.getValue();
  }

  set decks(decks) {
    this._decks.next(decks);
  }

  get activeDeck() {
    return this._activeDeck.getValue();
  }

  set activeDeck(deck) {
    this._activeDeck.next(deck);
  }
}
