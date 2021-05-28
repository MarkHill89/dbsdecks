import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@dbsdecks/app/cards/state/card.model';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  constructor() { }
  @Input() leader: Card = {} as Card;
  @Input() mainDeck: Card[] = [];
  @Input() sideDeck: Card[] = [];

  ngOnInit(): void {
  }

  packDeck(deck: Card[]) {
    return deck.reduce((accum, value) => {
      const dupeIdx = accum.findIndex((item: Card) => item.cardNumber === value.cardNumber)
      if(dupeIdx === -1) {
        accum.push({qty: 1, ...value});
      } else {        
        accum[dupeIdx].qty++;
      }
      return accum;
    }, [] as Card[]);
  }

  cardListItemBackground(color: string){
    switch(color){
        case 'Red':
            return 'list-group-item-danger';
        case 'Blue':
            return 'list-group-item-primary';
        case 'Green':
            return 'list-group-item-success';
        case 'Yellow':
            return 'list-group-item-warning';
        case 'Black':
            return 'list-group-item-dark';
        case 'Blue;Red':
            return 'list-group-item-danger-primary';
        case 'Green;Red':
            return 'list-group-item-danger-success';
        case 'Red;Yellow':
            return 'list-group-item-danger-warning';
        case 'Blue;Green':
            return 'list-group-item-primary-success';
        case 'Blue;Yellow':
            return 'list-group-item-primary-warning';
        case 'Green;Yellow':
            return 'list-group-item-success-warning';
    }
    return;
  }
}
