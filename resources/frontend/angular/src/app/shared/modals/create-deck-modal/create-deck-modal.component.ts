import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppState } from '@dbsdecks/app/state/app.state';
import { loadLeaderCards } from '@dbsdecks/app/state/cards/cards.action';
import { LeaderCardState } from '@dbsdecks/app/state/cards/cards.reducer';
import { selectLeaderCards } from '@dbsdecks/app/state/cards/cards.selector';
import { openSideNav } from '@dbsdecks/app/state/shared/side-nav/side-nav.actions';
import { Store } from '@ngrx/store';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subject, BehaviorSubject, tap } from 'rxjs';
import { LeaderCard } from 'src/app/api/card/card.model';
import { Deck } from 'src/app/api/decks/decks.model';
import { takeUntil } from 'rxjs/operators';
import { createDeck } from '@dbsdecks/app/state/decks/decks.actions';

@Component({
  selector: 'app-create-deck-modal',
  templateUrl: './create-deck-modal.component.html',
  styleUrls: ['./create-deck-modal.component.scss']
})
export class CreateDeckModalComponent implements OnInit, OnDestroy {

  @Output() onCreateDeck: EventEmitter<any> = new EventEmitter();

  openFilters$ = new BehaviorSubject(false);

  leaders$ = this.store.select(selectLeaderCards());
  filteredLeaders$ = new BehaviorSubject([] as LeaderCard[]);

  newDeckForm!: FormGroup;

  onDestroy$: Subject<any> = new Subject();

  selectedLeader$ = new BehaviorSubject({} as LeaderCard);
  activeView$ = new BehaviorSubject<String>("leaderSelection");

  cardFilters !: FormGroup;

 
  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadLeaderCards());
    
    this.newDeckForm = this.formBuilder.group({
      leaderNumber: new FormControl(''),
      title: new FormControl('')
    })

    this.cardFilters = this.formBuilder.group({
      name: new FormControl('')
    })

    this.cardFilters.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((values) => {
    this.leaders$ = this.store.select(selectLeaderCards(values))
    })
  }

  openFilters() {
    this.store.dispatch(openSideNav({open: true}))
   }
 
  createDeck() {
    this.store.dispatch(createDeck(this.newDeckForm.value))
  }

  selectLeader(leader: LeaderCard) {
    this.newDeckForm.controls['leaderNumber'].setValue(leader.Number)
    this.selectedLeader$.next(leader);
  }

  changeView(view: String) {
    this.activeView$.next(view);
  }

  leaderImage(imageString: String) {
    return imageString.split(";")[0];
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  onSelectCardTab(event$: any) {

  }

  onSelectFilterTab(event$: any) {

  }
}
