import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CardStoreService } from '@dbsdecks/app/api/card/card-store.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Observer, of, Subject, switchMap, takeUntil, BehaviorSubject, combineLatest, forkJoin, startWith } from 'rxjs';
import { LeaderCard } from 'src/app/api/card/card.model';
import { CardService } from 'src/app/api/card/card.service';
import { Deck } from 'src/app/api/decks/decks';

@Component({
  selector: 'app-create-deck-modal',
  templateUrl: './create-deck-modal.component.html',
  styleUrls: ['./create-deck-modal.component.scss']
})
export class CreateDeckModalComponent implements OnInit, OnDestroy {

  @Output() onCreateDeck: EventEmitter<any> = new EventEmitter();

  leaders$ = this.cardStore.leaders$.pipe();
  filteredLeaders$ = new BehaviorSubject([] as LeaderCard[]);

  newDeckForm!: FormGroup;

  onDestroy$: Subject<any> = new Subject();

  selectedLeader$ = new BehaviorSubject({} as LeaderCard);
  activeView$ = new BehaviorSubject<String>("leaderSelection");

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private cardStore: CardStoreService
  ) { }

  ngOnInit(): void {
    this.newDeckForm = this.formBuilder.group({
      leaderNumber: new FormControl(''),
      title: new FormControl('')
    })

    this.leaders$.pipe(takeUntil(this.onDestroy$)).subscribe((leaders) => {
      let filteredLeaders = leaders;
      this.filteredLeaders$.next(filteredLeaders);
    })
    this.cardService.getLeaderCards('').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  createDeck() {
    let deck = this.newDeckForm.value as Deck;
    // TODO: manifest userId into the deck somehow
    this.onCreateDeck.emit(deck);

  }

  selectLeader(leader: LeaderCard) {
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

  applyFilters(event: any) {
    this.leaders$.pipe(takeUntil(this.onDestroy$)).subscribe((leaders) => {
      let filteredLeaders = leaders;

      if(event?.color?.length) {
        filteredLeaders = filteredLeaders.filter(card => event.color.includes(card.Color));
      }

      this.filteredLeaders$.next(filteredLeaders);
    })
  }

  onSelectCardTab(event$: any) {

  }

  onSelectFilterTab(event$: any) {

  }
}
