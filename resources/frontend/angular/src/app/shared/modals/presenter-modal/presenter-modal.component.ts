import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { Card } from '@dbsdecks/app/cards/state/card.model';
@Component({
  selector: 'app-presenter-modal',
  templateUrl: './presenter-modal.component.html',
  styleUrls: ['./presenter-modal.component.scss']
})
export class PresenterModalComponent implements OnInit {

  @Input() leaderCard !: Card;
  @Input() mainDeck !: Card[];
  @Input() sideDeck !: Card[];

  _mainDeck : Card[] = [];
  _sideDeck : Card[] = [];

  _unisonCards : Card[] = [];
  _battleCards : Card[] = [];
  _extraCards : Card[] = [];

  displayCard$: BehaviorSubject<Card> = new BehaviorSubject<Card>({} as Card);
  displayIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  view$: BehaviorSubject<String> = new BehaviorSubject<String>('leader'); // leader, main, side
  subView$: BehaviorSubject<String> = new BehaviorSubject<String>('battle'); // battle, extra, unison 
  activeDeck$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([] as Card[]);

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.leaderCard);
    this.displayCard$.next(this.leaderCard)
    this._mainDeck = this.packDeck([...this.mainDeck]);
    this._battleCards = this._mainDeck.filter((card: Card) => card.cardType == 'Battle').sort((a: any, b: any) => a.cardName - b.cardName);
    this._extraCards = this._mainDeck.filter((card: Card) => card.cardType == 'Extra').sort((a: any, b: any) => a.cardName - b.cardName);
    this._unisonCards = this._mainDeck.filter((card: Card) => card.cardType == 'Unison').sort((a: any, b: any) => a.cardName - b.cardName);
    this._sideDeck = this.packDeck([...this.sideDeck]).sort((a: any, b: any) => a.cardName - b.cardName);
  }

  nextCard() {
    if(this.view$.getValue() === 'leader') {
      this.displayIndex$.next(0);
      this.view$.next('main');
      this.subView$.next('battle');
      this.activeDeck$.next(this._battleCards);
      this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
    } else {
      const view = this.view$.getValue();
      const subView = this.subView$.getValue();
      const nextIndex = this.displayIndex$.getValue() + 1;
      this.displayIndex$.next(nextIndex);
      if(this.displayIndex$.getValue() >= this.activeDeck$.getValue().length) { 
        if(view === 'main' && subView === 'battle') {
          this.subView$.next('extra');
          this.activeDeck$.next(this._extraCards);
          this.displayIndex$.next(0);
          this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
          return;
        }
        if(view === 'main' && subView === 'extra') {
          if(this._unisonCards.length) {
            this.subView$.next('unison');
            this.activeDeck$.next(this._unisonCards);
            this.displayIndex$.next(0);
            this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
            return;
          }
          if(this._sideDeck.length) {
            this.view$.next('side');
            this.displayIndex$.next(0);
            this.activeDeck$.next(this._sideDeck);
            this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
            return;
          }
          this.view$.next('leader');
          this.displayCard$.next(this.leaderCard);
          return;
        }
        if(view === 'main' && subView === 'unison') {
          if(this._sideDeck.length) {
            this.view$.next('side');
            this.displayIndex$.next(0);
            this.activeDeck$.next(this._sideDeck);
            this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
            return;
          } else {
            this.view$.next('leader');
            this.displayCard$.next(this.leaderCard);
            return;
          }
        }
        if(view === 'side') {
          this.displayCard$.next(this.leaderCard);
          this.view$.next('leader');
          return;
        }
      }
      this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
    }
  }

  previousCard() {
    if(this.view$.getValue() === 'leader') {
      if(this._sideDeck.length) {
        this.displayIndex$.next(this._sideDeck.length-1);
        this.view$.next('side');
        this.activeDeck$.next(this._sideDeck);
        this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
        return
      }
      if(this._unisonCards.length) {
        this.view$.next('main');
        this.subView$.next('unison');
        this.displayIndex$.next(this._unisonCards.length - 1);
        this.activeDeck$.next(this._unisonCards);
        this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
        return;
      }
      this.view$.next('main');
      this.subView$.next('extra');
      this.displayIndex$.next(this._extraCards.length-1);
      this.activeDeck$.next(this._extraCards);
      this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
    } else {
      let view = this.view$.getValue();
      let subView = this.subView$.getValue();
      this.displayIndex$.next(this.displayIndex$.getValue() - 1 );
      if(this.displayIndex$.getValue() < 0) {  
        if(view == 'leader' && this._sideDeck.length) {
          this.view$.next('side');
          this.activeDeck$.next(this._sideDeck);
          this.displayIndex$.next(this.activeDeck$.getValue().length - 1 );
          this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
        } else if (view == 'side' && this._unisonCards.length) {
          this.view$.next('main');
          this.subView$.next('unison');
          this.activeDeck$.next(this._unisonCards);
          this.displayIndex$.next(this.activeDeck$.getValue().length - 1 );
          this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
        } else if (view == 'side' && !this._unisonCards.length) {
          this.view$.next('main');
          this.subView$.next('extra');
          this.activeDeck$.next(this._extraCards);
          this.displayIndex$.next(this.activeDeck$.getValue().length - 1 );
          this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
        } else if (view == 'main' && subView == 'unison') {
          this.subView$.next('extra');
          this.activeDeck$.next(this._extraCards);
          this.displayIndex$.next(this.activeDeck$.getValue().length - 1 );
          this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
        } else if( view == 'main' && subView == 'extra') {
          this.subView$.next('battle');
          this.activeDeck$.next(this._battleCards);
          this.displayIndex$.next(this.activeDeck$.getValue().length - 1 );
          this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
        } else {
          this.view$.next('leader');
          this.displayCard$.next(this.leaderCard);
        }
        return;
      }
      this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
    }
  }

  dismiss() {
    this.activeModal.dismiss()
  }

  packDeck(deck: Card[] | null) {
    if(deck === null) {
      this._mainDeck = [];
      this._sideDeck = [];
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

  changeView(view: String) {
    this.view$.next(view);
    switch(this.view$.getValue()) {
      case 'leader':
        this.displayCard$.next(this.leaderCard);
        break;
      case 'main':
        this.subView$.next('battle');
        this.activeDeck$.next(this._battleCards);
        this.displayIndex$.next(0);
        this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
        break;
      case 'side':
        this.activeDeck$.next(this._sideDeck);
        this.displayIndex$.next(0);
        this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
        break;
    }
  }
  changeSubView(subView: String) {
    this.view$.next('main');
    this.subView$.next(subView);
    switch(this.subView$.getValue()) {
      case 'battle':
        this.activeDeck$.next(this._battleCards);
        this.displayIndex$.next(0);
        this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
        break;
      case 'extra':
        this.activeDeck$.next(this._extraCards);
        this.displayIndex$.next(0);
        this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
        break;
      case 'unison':
        this.activeDeck$.next(this._unisonCards);
        this.displayIndex$.next(0);
        this.displayCard$.next(this.activeDeck$.getValue()[this.displayIndex$.getValue()]);
        break;
    }
  }
}
