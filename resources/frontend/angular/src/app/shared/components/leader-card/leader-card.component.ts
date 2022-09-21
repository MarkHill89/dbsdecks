import { Component, OnInit, Input } from '@angular/core';
import { Card } from '@dbsdecks/app/cards/state/card.model';
@Component({
  selector: 'app-leader-card',
  templateUrl: './leader-card.component.html',
  styleUrls: ['./leader-card.component.scss']
})
export class LeaderCardComponent implements OnInit {


  @Input() leader: Card | null = {} as Card;
  
  constructor() { }

  ngOnInit(): void {
  }

}
