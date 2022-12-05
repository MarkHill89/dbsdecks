import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecksStoreService } from '@dbsdecks/app/api/decks/decks-store.service';
import { DecksService } from '@dbsdecks/app/api/decks/decks.service';
import { Deck } from '@dbsdecks/app/api/decks/decks';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject();

  deck$ : Observable<Deck> = this.deckStore.activeDeck$.pipe(takeUntil(this.onDestroy$)).pipe();
  editing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private deckStore : DecksStoreService,
    private deckService : DecksService,
  ) { }

  ngOnInit(): void {
    this.deckService.findDeck(parseInt(this.route.snapshot.params['deckId'])).pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  edit() {
    this.editing$.next(true);
  }

  save() {

  }

  cancel() {
    this.editing$.next(false);
  }

  ngOnDestroy(): void {
      this.onDestroy$.next(false);
      this.onDestroy$.complete();
  }
}
