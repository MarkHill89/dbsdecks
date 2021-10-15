import { Component, OnInit, Inject, HostListener, NgModuleRef, OnDestroy, ɵɵsetComponentScope } from '@angular/core';
import { CardsQuery } from '@dbsdecks/app/cards/state/cards.query';
import { CardsService } from '@dbsdecks/app/cards/state/cards.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Card } from '@dbsdecks/app/cards/state/card.model';
import * as _ from 'lodash';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterCards } from '@dbsdecks/app/infrastructure/classes/card-filter.class';
import { CardInfoModalComponent } from '@dbsdecks/app/shared/modals/card-info-modal/card-info-modal.component';
import { FormBuilder, FormControl, FormArray } from '@angular/forms';
import { DataService } from '@dbsdecks/app/infrastructure/services';
import { DeckService } from '@dbsdecks/app/deck-builder/state/deck-builder.service';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { ErrorModalComponent } from '../shared/modals/error-modal/error-modal.component';
import { SuccessModalComponent } from '../shared/modals/success-modal/success-modal.component';

declare let gtag: Function;

@Component({
  selector: 'app-deck-builder',
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.scss']
})
export class DeckBuilderComponent implements OnInit, OnDestroy {

  private changesSaved: boolean = false;
  private cards: Card[] = [];
  private scrollSum = 24;

  /**
   * Begin Filters
   */
  private cardFilters = {
    cardType: ["Leader"],
    cost: new Array,
    color:  new Array,
    title: '',
    description: '',
    cardNumber: ''
  };

  public filterForm: any;

  cardTypeData = [
    {id: 'Leader', name: 'Leader'},
    {id: 'Unison', name: 'Unison'},
    {id: 'Battle', name: 'Battle'},
    {id: 'Extra', name: 'Extra'}
  ];

  colorData = [
    {id: 'Red', name: 'red'},
    {id: 'Blue', name: 'blue'},
    {id: 'Green', name: 'green'},
    {id: 'Yellow', name: 'yellow'},
    {id: 'Black', name: 'black'},
    {id: 'Green;Red', name: 'red-green'},
    {id: 'Blue;Yellow', name: 'blue-yellow'},
    {id: 'Red;Yellow', name: 'red-yellow'},
    {id: 'Blue;Green', name: 'blue-green'},
    {id: 'Blue;Red', name: 'blue-red'},
    {id: 'Green;Yellow', name: 'green-yellow'},
    {id: 'Black;Red', name: 'red-black'},
    {id: 'Black;Blue', name: 'blue-black'},
    {id: 'Black;Green', name: 'green-black'},
    {id: 'Black;Yellow', name: 'yellow-black'}
  ];

  costData = [
    {id: 0, name: '0'},
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'},
    {id: 5, name: '5'},
    {id: 6, name: '6'},
    {id: 7, name: '7+'}
  ];

  /** End filters */

  showList = 1;
  showFilters = true;
  title: string = '';
  deckId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  deckIsValid = false;
  leaderCard$: BehaviorSubject<Card> = new BehaviorSubject<Card>({} as Card);
  mainDeck$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([] as Card[]);
  sideDeck$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([] as Card[]);
  mainDeckPacked$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([] as Card[]);
  sideDeckPacked$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([] as Card[]);
  view$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  isPrivate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  action: string = '';

  isSave: boolean = true;
  isBusy: boolean = false;

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        gtag('config', 'UA-114061835-1', {
            'page_path': event.urlAfterRedirects
        });
      }
    });
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
  }

  canDeactivate() {
    return this.isNavigationAllowed();
  }

  private isNavigationAllowed(): Promise<boolean> {
    return new Promise<boolean> ( (resolve) => {
      if(this.changesSaved) {
        resolve(true);
      }else {
        resolve(confirm("Your deck is not saved, you sure you want to leave?"));
      }
    });
  }

  ngOnInit(): void {

    const title = this.cardFilters.title || '';
    const description = this.cardFilters.description || '';
    const cardNumber = this.cardFilters.cardNumber || '';
    this.filterForm = this.fb.group({
      cardType: new FormArray([]),
      cost: new FormArray([]),
      color: new FormArray([]),
      title: [title],
      description: [description],
      cardNumber: [cardNumber]
    });

    this.addCheckBoxes();
    this.addCostCheckBoxes();
    this.addCardTypeCheckBoxes();

    this.filterForm.valueChanges.subscribe((formValues: any) => {
      formValues.color = this.filterForm.value.color
        .map((checked: boolean, i: number) => checked ? this.colorData[i].id : null)
        .filter((v: string | null) => v !== null);
      formValues.cardType = this.filterForm.value.cardType
        .map((checked: boolean, i: number) => checked ? this.cardTypeData[i].id : null)
        .filter((v: string | null) => v !== null);
      formValues.cost = this.filterForm.value.cost
        .map((checked: boolean, i: number) => checked ? this.costData[i].id : null)
        .filter((v: string | null) => v !== null);
      this.cardFilters = formValues;

      this.scrollSum = 24;
      this.scrollToTop();
      this.activeCards = FilterCards(this.cards, this.cardFilters).slice(0, this.scrollSum);
    });

    this.subscriptions.add(this.cardQuery.cards$.subscribe((cards: Card[]) => {
      if(cards.length) {
        this.cards = _.chain(cards)
        .sortBy(['cardName', 'energyCost'])
        .value();
        this.activeCards = FilterCards(this.cards, this.cardFilters).slice(0, 24);
      } else {
        this.subscriptions.add(this.cardsService.get().subscribe())
      }
    }));

    this.activatedRoute.queryParams.subscribe(params => {
      this.deckId$.next(params.id);
      this.action = params.action;
      if (this.deckId$.getValue() !== undefined) {
        this.dataService.getDeckListData(this.deckId$.getValue()).subscribe((data: any) =>{
          this.title = data.title;
          this.isPrivate$.next(data.isPrivate ? true : false);
        });

        this.dataService.getDeckViewData(this.deckId$.getValue()).subscribe((deck: any) =>{
          this.mainDeck$.next(_.orderBy(deck.mainDeck, ['cardName'], ['asc']));
          this.sideDeck$.next(_.orderBy(deck.sideDeck, ['cardName'], ['asc']));
          this.leaderCard$.next(deck.leader[0]);
          this.mainDeckPacked$.next(this.packDeck(this.mainDeck$.getValue()));
          this.sideDeckPacked$.next(this.packDeck(this.sideDeck$.getValue()));
          setTimeout(() => {
            if (deck.mainDeck.length > 0 && this.action === 'edit'){
              this.isSave = false;
            }
          }, 0);
        });
        this.checkIfDeckIsValid();
      }
    });
    this.mainDeckPacked$.next(this.packDeck(this.mainDeck$.getValue()));
    this.sideDeckPacked$.next(this.packDeck(this.sideDeck$.getValue()));
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
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
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
        this.activeCards = FilterCards(this.cards, this.cardFilters).slice(0, this.scrollSum);
        break;
    }
  }

  onScrollDown() {
    let cardsToAdd: Card[] = [];
    cardsToAdd = FilterCards(this.cards, this.cardFilters).slice(this.scrollSum, this.scrollSum + 12);
    this.scrollSum += 12;
    cardsToAdd.forEach(card => {
      this.activeCards.push(card);
    });
  }

  setLeaderCard(card: Card) {
    this.leaderCard$.next(card);
  }

  changeLeader(){
    this.filterForm.get('cardType').setValue([true, false, false, false]);
  }

  addCard(card: Card) {
    delete card.qty;
    const _mainDeck = this.mainDeck$.getValue();
    const _sideDeck = this.sideDeck$.getValue();
    if(card.cardType === 'Leader') {
      this.leaderCard$.next(card);
      this.filterForm.get('cardType').setValue([false, true, true, true]);
    }else {
      if(this.deckCheck(card)) {
        if(this.entryMode === 'main' && _mainDeck.length < 60) {
          _mainDeck.push(card);
          this.mainDeck$.next(_.orderBy(_mainDeck, ['cardName'], ['asc']));
        } else if(this.entryMode === 'side' && _sideDeck.length < 15) {
          _sideDeck.push(card);
          this.sideDeck$.next(_.orderBy(_sideDeck, ['cardName'], ['asc']));
        }
      }
    }
    this.checkIfDeckIsValid();
    this.mainDeckPacked$.next(this.packDeck(this.mainDeck$.getValue()));
    this.sideDeckPacked$.next(this.packDeck(this.sideDeck$.getValue()));
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
    this.mainDeckPacked$.next(this.packDeck(this.mainDeck$.getValue()));
    this.sideDeckPacked$.next(this.packDeck(this.sideDeck$.getValue()));
  }

  swapCardToBoard(card: Card) {
    delete card.qty;
    this.removeCard(card);
    const _mainDeck = this.mainDeck$.getValue();
    const _sideDeck = this.sideDeck$.getValue();
    if(this.deckCheck(card)) {
      if(this.entryMode === 'side' && _mainDeck.length < 60) {
        _mainDeck.push(card);
        
        this.mainDeck$.next(_.orderBy(_mainDeck, ['cardName'], ['asc']));
      } else if(this.entryMode === 'main' && _sideDeck.length < 15) {
        _sideDeck.push(card);
        console.log(_sideDeck.length)
        this.sideDeck$.next(_.orderBy(_sideDeck, ['cardName'], ['asc']));
      }
    }
    this.checkIfDeckIsValid();
    this.mainDeckPacked$.next(this.packDeck(this.mainDeck$.getValue()));
    this.sideDeckPacked$.next(this.packDeck(this.sideDeck$.getValue()));
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
    console.log(deckList);
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

  private packDeck(deck: Card[] | null) {
    if(deck === null) {
      this.mainDeckPacked$.next([]);
      this.sideDeckPacked$.next([]);
      return [];
    }
    let cards: Card[] = deck.reduce((acc: any, value) => {
      acc.push({qty: deck.reduce((sum: number, n: any) => {
        if(n.cardNumber === value.cardNumber) {
          sum++;
        }
        return sum;
      }, 0), ...value});
      return acc;
    }, [] as Card[]);
    let ids = cards.map((o: any) => o.cardNumber);
    let filteredCards = cards.filter(({cardNumber}, index)=> !ids.includes(cardNumber, index+1));
    return filteredCards;
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
      this.deckIsValid = false;
    }else {
      this.deckIsValid = true;
    }
  }

  getMainCardCount(card: Card): number{
    return this.mainDeck$.getValue().reduce((acc: number, c: Card) => c.cardNumber === card.cardNumber ? acc + 1 : acc, 0);
  }

  getSideCardCount(card: Card): number{
    return this.sideDeck$.getValue().reduce((acc: number, c: Card) => c.cardNumber === card.cardNumber ? acc + 1 : acc, 0);
  }

  showCardInfo(card: Card) {
    const modalRef = this.modal.open(CardInfoModalComponent);
    modalRef.componentInstance.card = card;
  }

  submitDeck() {
    this.isBusy = true;
    const deck = {
      id: this.deckId$.getValue(),
      title : this.title,
      isPrivate: this.isPrivate$.getValue(),
      leader: this.leaderCard$.getValue(),
      mainDeck: this.mainDeck$.getValue(),
      sideDeck: this.sideDeck$.getValue()
    };
    this.subscriptions.add(this.dataService.submitDeck(deck).subscribe((deckId) => {
      this.deckService.updateDeck(deck);
      this.view$.next(0);
      this.isSave = false;
      const modalRef = this.modal.open(SuccessModalComponent);
      modalRef.componentInstance.successMessage = 'You deck has been saved. You may stay in this view to continue to edit';
      this.deckId$.next(deckId.id.id);
      this.isBusy = false;
    }, (error) => {
      const modalRef = this.modal.open(ErrorModalComponent);
      modalRef.componentInstance.error = error;
    }));
  }

  updateDeck(){
    this.isBusy = true;
    const deck = { 
      id: this.deckId$, 
      title : this.title,
      isPrivate: this.isPrivate$.getValue(),
      leader: this.leaderCard$.getValue(),
      mainDeck: this.mainDeck$.getValue(),
      sideDeck: this.sideDeck$.getValue()
    };
    this.dataService.updateDeck(deck).subscribe((deckId) => {
      this.deckService.updateDeck(deck);
      this.view$.next(0);
      const modalRef = this.modal.open(SuccessModalComponent);
      modalRef.componentInstance.successMessage = 'You deck has been updated.';
      this.isBusy = false;
    }, (error) => {
      const modalRef = this.modal.open(ErrorModalComponent);
      modalRef.componentInstance.error = error;
    });

  }

  clearDeck() {
    this.leaderCard$.next({} as Card);
    this.mainDeckPacked$.next([]);
    this.sideDeckPacked$.next([]);
    this.mainDeck$.next([]);
    this.sideDeck$.next([]);
    this.deckIsValid = false;
    this.isPrivate$.next(false);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get doNotDeckSubmit(): boolean {
    return (!this.isBusy) && (this.deckIsValid);
  }

  get colorFormArray() {
    return this.filterForm.controls.color as FormArray;
  }

  get costFormArray() {
    return this.filterForm.controls.cost as FormArray;
  }

  get cardTypeFormArray() {
    return this.filterForm.controls.cardType as FormArray;
  }

  private addCostCheckBoxes() {
    this.costData.forEach((cost) => {
      let idx = -1;
      if (this.cardFilters?.cost?.length) {
        idx = this.cardFilters.cost.indexOf(cost.id);
      }
      idx > -1 ? this.costFormArray.push(new FormControl(true)) : this.costFormArray.push(new FormControl(false));
    });
  }

  private addCheckBoxes() {
    this.colorData.forEach((color) => {
      let idx = -1;
      if (this.cardFilters?.color?.length) {
        idx = this.cardFilters.color.indexOf(color.id);
      }
      idx > -1 ? this.colorFormArray.push(new FormControl(true)) : this.colorFormArray.push(new FormControl(false));
    });
  }

  private addCardTypeCheckBoxes() {
    this.cardTypeData.forEach((cardType) => {
      let idx = -1;
      if (this.cardFilters?.cardType?.length) {
        idx = this.cardFilters.cardType.indexOf(cardType.id);
      }
      idx > -1 ? this.cardTypeFormArray.push(new FormControl(true)) : this.cardTypeFormArray.push(new FormControl(false));
    });
  }
}
