import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateDeckModalComponent } from '../../../shared/modals/create-deck-modal/create-deck-modal.component';
import { Store } from '@ngrx/store';
import { loadDecks } from '@dbsdecks/app/state/decks/decks.actions';
import { DeckState } from '@dbsdecks/app/state/decks/decks.reducer';
import { selectAllDecks } from '@dbsdecks/app/state/decks/decks.selectors';
import { AppState } from '@dbsdecks/app/state/app.state';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject();

  decks$: Observable<DeckState> = this.store.select(selectAllDecks)

  bsModalRef?: BsModalRef;

  constructor(
    private store: Store<AppState>,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadDecks())
  }

  openNewDeckModal() {
    
    this.bsModalRef = this.modalService.show(CreateDeckModalComponent);
    this.bsModalRef.content.onCreateDeck.pipe(takeUntil(this.onDestroy$)).subscribe((event: any) => {
      // this.deckService.createDeck(event).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      //   this.modalService.hide();
      //   this.router.navigate(['/decks/edit/', this.deckStore.activeDeck.id]);
      // });
    });
  }

  breakImageUrl(url: string) : string {
    return url.split(';')[0];
  }

  backgroundImageStyle(url: string) : string {
    return `background-image: url(${url});`;
  }

  ngOnDestroy(): void {
      this.onDestroy$.next(false);
      this.onDestroy$.complete();
  }




}
