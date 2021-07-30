import { Component, OnInit, Inject, HostListener, NgModuleRef, OnDestroy } from '@angular/core';
import { CardsQuery } from '@dbsdecks/app/cards/state/cards.query';
import { CardsService } from '@dbsdecks/app/cards/state/cards.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Card } from '@dbsdecks/app/cards/state/card.model';
import * as _ from 'lodash';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardFilterModalComponent } from '@dbsdecks/app/shared/modals/card-filter-modal/card-filter-modal.component';
import { FilterCards } from '@dbsdecks/app/infrastructure/classes/card-filter.class';
import { CardInfoModalComponent } from '@dbsdecks/app/shared/modals/card-info-modal/card-info-modal.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataService } from '@dbsdecks/app/infrastructure/services';
import { DeckService } from './state/deck-builder.service';
import { Router } from '@angular/router';
import { ErrorModalComponent } from '../shared/modals/error-modal/error-modal.component';

@Component({
  selector: 'app-deck-builder',
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.scss']
})
export class DeckBuilderComponent implements OnInit, OnDestroy {

  private cards: Card[] = [];
  private leaderCards: Card[] = [];
  private unisonCards: Card[] = [];
  private battleAndExtraCards: Card[] = [];
  private scrollSum = 24;

  private leaderCardFilters = {};
  private unisonCardFilters = {};
  private battleAndExtraCardFilters = {};

  title: FormControl;
  deckId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  deckIsValid$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  leaderCard$: BehaviorSubject<Card> = new BehaviorSubject<Card>({} as Card);
  mainDeck$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([] as Card[]);
  sideDeck$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([] as Card[]);
  view$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isPrivate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  activeCards: Card[] = [];
  subscriptions: Subscription = new Subscription;
  
  windowScrolled: boolean = false;
  entryMode: string  = 'main';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cardQuery: CardsQuery,
    private cardsService: CardsService,
    private modal: NgbModal,
    private fb: FormBuilder,
    private dataService: DataService,
    private deckService: DeckService,
    private router: Router
  ) { 
    this.title = fb.control({value: ''});
  }

  ngOnInit(): void {
    this.subscriptions.add(this.cardQuery.cards$.subscribe((cards: Card[]) => {
      if(cards.length) {
        this.cards = cards;
        this.leaderCards = _.chain(this.cards)
          .filter((card: Card) => card.cardType == 'Leader')
          .sortBy(['title'])
          .value();
        this.unisonCards = _.chain(this.cards)
          .filter((card: Card) => card.cardType == 'Unison')
          .sortBy(['title'])
          .value();
        this.battleAndExtraCards =_.chain(this.cards)
          .filter((card:Card) => card.cardType != 'Leader' && card.cardType != 'Unison')
          .sortBy(['title', 'energyCost'])
          .value();
        switch(this.view$.getValue()) {
          case 1:
            this.activeCards = this.leaderCards.slice(0, 24);
            break;
          case 2:
            this.activeCards = this.unisonCards.slice(0, 24);
            break;
          case 3:
            this.activeCards = this.battleAndExtraCards.slice(0, 24);
            break;
          default:
            this.activeCards = this.leaderCards.slice(0, 24);
            break;
        }
      } else {
        this.subscriptions.add(this.cardsService.get().subscribe())
      }
    }));
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
      if(window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop > 100) {
        this.windowScrolled = true;
      }else if (this.windowScrolled && window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop < 10) {
        this.windowScrolled = false;
      }
  }

  scrollToTop() {
    (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    })();
  }

  switchView(view: number) {
    this.view$.next(view);
    this.scrollSum = 24;
    switch(view) {
      case 1:
        this.activeCards = FilterCards(this.leaderCards, this.leaderCardFilters).slice(0, this.scrollSum);
        break;
      case 2:
        this.activeCards = FilterCards(this.unisonCards, this.unisonCardFilters).slice(0, this.scrollSum);
        break;
      case 3:
        this.activeCards = FilterCards(this.battleAndExtraCards, this.battleAndExtraCardFilters).slice(0, this.scrollSum);
        break;
      default:
        this.activeCards = FilterCards(this.leaderCards, this.leaderCardFilters).slice(0, this.scrollSum);
        break;
    }
   
  }

  onScrollDown() {
    let cardsToAdd = [];
    switch(this.view$.getValue()) {
      case 1:
        cardsToAdd = FilterCards(this.leaderCards, this.leaderCardFilters).slice(this.scrollSum, this.scrollSum + 12);
        break;
      case 2:
        cardsToAdd = FilterCards(this.unisonCards, this.unisonCardFilters).slice(this.scrollSum, this.scrollSum + 12);
        break;
      case 3:
        cardsToAdd = FilterCards(this.battleAndExtraCards, this.battleAndExtraCardFilters).slice(this.scrollSum, this.scrollSum + 12);
        break;
      default:
        cardsToAdd = FilterCards(this.leaderCards, this.leaderCardFilters).slice(this.scrollSum, this.scrollSum + 12);
        break;
    }
    this.scrollSum += 12;
    cardsToAdd.forEach(card => {
      this.activeCards.push(card);
    });
  }

  setLeaderCard(card: Card) {
    this.leaderCard$.next(card);
  }

  addCard(card: Card) {
    let _mainDeck = this.mainDeck$.getValue();
    let _sideDeck = this.sideDeck$.getValue();
    if(this.deckCheck(card)) {
      if(this.entryMode === 'main' && _mainDeck.length < 60) {
        _mainDeck.push(card);
        this.mainDeck$.next(_mainDeck);
      } else if(this.entryMode === 'side' && _sideDeck.length < 15) {
        _sideDeck.push(card);
        this.sideDeck$.next(_sideDeck);
      }
    }
    this.checkIfDeckIsValid();
  }

  removeCard(card: Card) {
    if(this.entryMode === 'main') {
      let _mainDeck = this.mainDeck$.getValue();
      const idx = _.findIndex(_mainDeck, c => c.cardNumber === card.cardNumber);
      if (idx > -1 ) _.pullAt(_mainDeck, idx);
      this.mainDeck$.next(_mainDeck);
    }else {
      let _sideDeck = this.sideDeck$.getValue();
      const idx = _.findIndex(_sideDeck, c => c.cardNumber === card.cardNumber);
      if (idx > -1) _.pullAt(_sideDeck, idx);
      this.sideDeck$.next(_sideDeck);
    }
    this.checkIfDeckIsValid();
  }

  unpackDeck(deck: Card[]) {
    deck.map((card: Card) => {
      if(card.qty) {
        for(let i = 0; i < card.qty; i++) {
          this.mainDeck$.getValue().push(card);
        }
      }
    })
  }

  setDeckVisibility(status: boolean) {
    this.isPrivate$.next(status);
  }

  private deckCheck(card: Card): boolean {
    let deckList = this.mainDeck$.getValue().concat(this.sideDeck$.getValue());
    if(deckList.length === 0) {
      return true;
    }
    if(card.isUltimate) {
      return deckList.reduce((acc: number, c: Card) => c.isUltimate ? acc + 1 : acc, 0) < 1;
    }
    if(card.isSuperCombo) {
      return deckList.reduce((acc: number, c: Card) => c.isSuperCombo ? acc + 1: acc, 0) < 4;
    }
    if(card.isDragonBall) {
      return deckList.reduce((acc: number, c: Card) => c.isDragonBall ? acc + 1: acc, 0) < 7;
    }
    return deckList.reduce((acc: number, c: Card) => c.cardNumber === card.cardNumber ? acc + 1 : acc, 0) < card.cardLimit;
  }

  checkIfDeckIsValid() {
    let _mainDeck = this.mainDeck$.getValue();
    let _sideDeck = this.sideDeck$.getValue();
    let errorCount = 0;
    if (_mainDeck.length < 50) errorCount++;
    if (_mainDeck.length > 60) errorCount++;
    if (_sideDeck.length > 15) errorCount++;

    let deckList = _mainDeck.concat(_sideDeck);
    if(deckList.reduce((acc: number, c: Card) => c.isUltimate ? acc + 1 : acc, 0) > 1) errorCount++;
    if(deckList.reduce((acc: number, c: Card) => c.isSuperCombo ? acc + 1: acc, 0) > 4) errorCount++;
    if(deckList.reduce((acc: number, c: Card) => c.isDragonBall ? acc + 1: acc, 0) > 7) errorCount++;

    if(errorCount > 0) {
      this.deckIsValid$.next(false);
    }else {
      this.deckIsValid$.next(true);
    }
  }

  getMainCardCount(card: Card) : number{
    return this.mainDeck$.getValue().reduce((acc: number, c: Card) => c.cardNumber === card.cardNumber ? acc + 1 : acc, 0);
  }

  getSideCardCount(card: Card) : number{
    return this.sideDeck$.getValue().reduce((acc: number, c: Card) => c.cardNumber === card.cardNumber ? acc + 1 : acc, 0);
  }

  showCardInfo(card: Card) {
    const modalRef = this.modal.open(CardInfoModalComponent);
    modalRef.componentInstance.card = card;
  }

  openFilters(title: string) {
    const modalRef = this.modal.open(CardFilterModalComponent)
    modalRef.componentInstance.modalTitle = title;
    switch(this.view$.getValue()) {
      case 1: 
        modalRef.componentInstance.cardFilters = this.leaderCardFilters;
        break;
      case 2:
        modalRef.componentInstance.cardFilters = this.unisonCardFilters;
        break;
      case 3:
        modalRef.componentInstance.cardFilters = this.battleAndExtraCardFilters;
        break;
    }
    modalRef.componentInstance.cardFilterValues.subscribe((cardFilterValues: any) => {
      this.scrollSum = 24;
      this.scrollToTop();
      switch(this.view$.getValue()) {
        case 1:
          this.activeCards = FilterCards(this.leaderCards, cardFilterValues).slice(0, this.scrollSum);
          this.leaderCardFilters = cardFilterValues;
          break;
        case 2:
          this.activeCards = FilterCards(this.unisonCards, cardFilterValues).slice(0, this.scrollSum);
          this.unisonCardFilters = cardFilterValues;
          break;
        case 3:
          this.activeCards = FilterCards(this.battleAndExtraCards, cardFilterValues).slice(0, this.scrollSum);
          this.battleAndExtraCardFilters = cardFilterValues;
          break;
      }
    })
  }

  submitDeck() {
    const deck = { 
      id: this.deckId$.getValue(), 
      title : this.title.value,
      isPrivate: this.isPrivate$.getValue(),
      leader: this.leaderCard$.getValue(),
      mainDeck: this.mainDeck$.getValue(),
      sideDeck: this.sideDeck$.getValue()
    };
    this.subscriptions.add(this.dataService.submitDeck(deck).subscribe((deckId) => {
      this.deckService.updateDeck(deck);
      this.router.navigate(['/deck/view', deckId]);
    }, (error) => {
      const modalRef = this.modal.open(ErrorModalComponent);
      modalRef.componentInstance.error = error;
    }));
  }

  clearDeck() {
    this.leaderCard$.next({} as Card);
    this.mainDeck$.next([]);
    this.sideDeck$.next([]);
    this.deckIsValid$.next(false);
    this.isPrivate$.next(false);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
