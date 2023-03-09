import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { selectCards } from '@dbsdecks/app/state/cards/cards.selector';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { loadCards } from '@dbsdecks/app/state/cards/cards.action';
import { Card } from '@dbsdecks/app/api/card/card.model';
import { openSideNav } from '../../../state/shared/side-nav/side-nav.actions';

@Component({
  selector: 'app-card-search-modal',
  templateUrl: './card-search-modal.component.html',
  styleUrls: ['./card-search-modal.component.scss']
})
export class CardSearchModalComponent implements OnInit, OnDestroy {
  
  @Output() onCardSelect: EventEmitter<any> = new EventEmitter();

  onDestroy$: Subject<any> = new Subject();

  openFilters$ = new BehaviorSubject(false);
  cards$ =  this.store.select(selectCards());

  cardFilters !: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCards());

    this.cardFilters = this.formBuilder.group({
      name: new FormControl('')
    })


    this.cardFilters.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((values) => {
      this.cards$ = this.store.select(selectCards(values))
    })
  }

  select(card: Card, qty: number) {
    this.onCardSelect.emit({
      card,
      qty
    });
  }

  cardImage(imageString: String) {
    return imageString.split(";")[0];
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  openFilters() {
    this.store.dispatch(openSideNav({open: true}))
   }
}
