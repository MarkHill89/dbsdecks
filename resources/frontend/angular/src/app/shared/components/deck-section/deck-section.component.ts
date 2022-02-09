import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@dbsdecks/app/cards/state/card.model';

@Component({
  selector: 'app-deck-section',
  templateUrl: './deck-section.component.html',
  styleUrls: ['./deck-section.component.scss']
})
export class DeckSectionComponent implements OnInit {
  
  @Input() deck: Card[] | null = [];
  @Input() sectionTitle : string = '';

  _deck: Card[] = [];
  constructor() { }

  ngOnInit(): void {
    this._deck = this.packDeck(this.deck);
  }

  packDeck(deck: Card[] | null) {
    if(deck === null) {
      this._deck = [];
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
}
