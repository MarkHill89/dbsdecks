import { Component } from '@angular/core';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss']
})
export class DeckListComponent {
  decks: Array<any> = [];
  constructor(

  ) {
   }

  ngOnInit() {
  }
}