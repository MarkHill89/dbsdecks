import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@dbsdecks/app/cards/state/card.model';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  constructor() { }
  @Input() leader: Card | null = {} as Card;
  @Input() mainDeck: Card[] | null = [];
  @Input() sideDeck: Card[] | null = [];

  ngOnInit(): void {
  }

  packDeck(deck: Card[] | null) {
    if(!deck) return [];
    return deck.reduce((accum, value) => {
      const dupeIdx = accum.findIndex((item: Card) => item.cardNumber === value.cardNumber)
      if(dupeIdx === -1) {
        accum.push({qty: 1, ...value});
        return accum;
      }
      accum[dupeIdx].qty = deck.reduce((sum: number, n: any) => {
        if(n.cardNumber === value.cardNumber) {
          sum++;
        }
        return sum;
      }, 0)
      return accum;
    }, [] as Card[]);
  }
}
