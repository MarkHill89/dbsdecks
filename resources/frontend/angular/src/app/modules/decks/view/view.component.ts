import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@dbsdecks/app/state/app.state';
import { selectActiveUser } from '@dbsdecks/app/state/user/user.selectors';
import { UserState } from '@dbsdecks/app/state/user/user.reducer';
import { loadDeck, updateDeckList } from '@dbsdecks/app/state/decks/decks.actions';
import { selectActiveDeckList } from '@dbsdecks/app/state/decks/decks.selectors';
import { Card } from '@dbsdecks/app/api/card/card.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject();
  isEditing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userState$: Observable<UserState> = this.store.select(selectActiveUser);
  deck$ = this.store.select(selectActiveDeckList);

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadDeck({id: this.route.snapshot.params.id}))
  }

  // view filters 
  mainDeck(cards: Card[] | undefined) {
    return cards?.filter(card => card.mainDeckQty)
  }

  sideDeck(cards: Card[] | undefined) {
    return cards?.filter(card => card.sideDeckQty)
  }
  zDeck(cards: Card[] | undefined) {
    return cards?.filter(card => card.zDeckQty)
  }

  breakImageUrl(url: String | undefined) : string[] {
    if(url) {
      return url.split(';');
    }
    return [];
  }

  updateList(event: Card) {
    this.store.dispatch(updateDeckList({card : event}))
  }

  edit() {
    this.isEditing$.next(true);
  }

  save() {

  }

  cancel() {
    this.isEditing$.next(false);
  }

  ngOnDestroy(): void {
      this.onDestroy$.next(false);
      this.onDestroy$.complete();
  }
}
