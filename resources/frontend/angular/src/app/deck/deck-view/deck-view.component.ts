import { Component } from '@angular/core';
import { DeckQuery } from '../../deck-builder/state/deck-builder.query';

@Component({
  selector: 'app-deck-view',
  templateUrl: './deck-view.component.html',
  styleUrls: ['./deck-view.component.scss']
})
export class DeckViewComponent {

  deck$ = this.deckQuery.deck$;

  constructor(
    private deckQuery: DeckQuery
  ) { }


  ngOnInit() {
  
  }


}
