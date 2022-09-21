import { Component, OnInit, OnDestroy } from '@angular/core';
import { DecksStoreService } from '@dbsdecks/app/api/decks/decks-store.service';
import { UserStoreService } from '@dbsdecks/app/api/user/user-store.service';
import { LoadingStoreService } from '@dbsdecks/app/api/loading/loading-store.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DecksService } from '@dbsdecks/app/api/decks/decks.service';
import { takeUntil } from 'rxjs/operators';
import { LoadingStatus } from '@dbsdecks/app/api/loading/loading.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CreateDeckModalComponent } from '../../../shared/modals/create-deck-modal/create-deck-modal.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject();

  authenticated$ = this.userStore.authenticated$.pipe(takeUntil(this.onDestroy$));
  decks$ = this.deckStore.decks$.pipe(takeUntil(this.onDestroy$));
  loading$ = this.loadingStore.loading$.pipe(takeUntil(this.onDestroy$));

  bsModalRef?: BsModalRef;

  get loadingStatus() {
    return LoadingStatus;
  }

  constructor(
    private userStore: UserStoreService,
    private deckStore: DecksStoreService,
    private deckService: DecksService,
    private loadingStore: LoadingStoreService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.deckService.getDecks({}).pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  openNewDeckModal() {
    
    this.bsModalRef = this.modalService.show(CreateDeckModalComponent);
    this.bsModalRef.content.onCreateDeck.pipe(takeUntil(this.onDestroy$)).subscribe((event: any) => {
      this.deckService.createDeck(event).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
        this.modalService.hide();
        this.router.navigate(['/decks/edit/', this.deckStore.activeDeck.id]);
      });
    });
  }

  ngOnDestroy(): void {
      this.onDestroy$.next(false);
      this.onDestroy$.complete();
  }




}
