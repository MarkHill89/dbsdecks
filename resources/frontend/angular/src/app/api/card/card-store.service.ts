import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeaderCard } from '../card/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardStoreService {

  private readonly _leaders = new BehaviorSubject<LeaderCard[]>([] as LeaderCard[]);
  readonly leaders$ = this._leaders.asObservable();

  constructor() { }

  get leaders() {
    return this._leaders.getValue();
  }

  set leaders(leaders) {
    this._leaders.next(leaders);
  }
}
