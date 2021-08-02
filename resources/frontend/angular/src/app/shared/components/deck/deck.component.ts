import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@dbsdecks/app/cards/state/card.model';
import { CardInfoModalComponent } from '../../modals/card-info-modal/card-info-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deck-layout',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  _mainDeck: Card[] = [];
  _sideDeck: Card[] = [];

  constructor(
    private modal: NgbModal) { }
    
  @Input() leader: Card | null = {} as Card;
  @Input() mainDeck: Card[] | null = [];
  @Input() sideDeck: Card[] | null = [];

  ngOnInit(): void {
    this._mainDeck = this.packDeck(this.mainDeck);
    this._sideDeck = this.packDeck(this.sideDeck);
  }

  packDeck(deck: Card[] | null) {
    if(deck === null) return [];
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
  
  showCardInfo(card: Card) {
    const modalRef = this.modal.open(CardInfoModalComponent);
    modalRef.componentInstance.card = card;
  }

}
