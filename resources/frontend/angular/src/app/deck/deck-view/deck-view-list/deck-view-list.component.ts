import { Component, OnInit, Input } from '@angular/core';
import { Utility } from 'src/app/core/classes/utility.class';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deck-view-list',
  templateUrl: './deck-view-list.component.html',
  styleUrls: ['./deck-view-list.component.scss']
})
export class DeckViewListComponent implements OnInit {
  @Input() deckList;
  @Input() prices;
  utility: Utility;
  deckListGroups: any;

  constructor() { 
    this.utility = new Utility();
  } 
  
  ngOnInit() {
  }

  findProductPrice(productId) {
    let price = this.prices.find(e => parseInt(e.productId) === parseInt(productId));
    if(!price) {
      return {lowPrice : 0}
    }
    return price;
  }
}
