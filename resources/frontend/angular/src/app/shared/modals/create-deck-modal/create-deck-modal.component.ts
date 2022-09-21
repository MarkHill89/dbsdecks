import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CardStoreService } from '@dbsdecks/app/api/card/card-store.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Observer, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Card } from 'src/app/api/card/card.model';
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

  newDeckForm!: FormGroup;
  onDestroy$: Subject<any> = new Subject();

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

    this.cardService.getLeaderCards('').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  createDeck() {
    let deck = this.newDeckForm.value as Deck;
    // TODO: manifest userId into the deck somehow
    this.onCreateDeck.emit(deck);

  }

  leaderImage(imageString: String) {
    return imageString.split(";")[0];
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}
