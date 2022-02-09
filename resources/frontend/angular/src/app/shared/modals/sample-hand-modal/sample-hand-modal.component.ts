import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from '../../../cards/state/card.model';

@Component({
  selector: 'app-sample-hand-modal',
  templateUrl: './sample-hand-modal.component.html',
  styleUrls: ['./sample-hand-modal.component.scss']
})
export class SampleHandModalComponent implements OnInit {

  @Input() mainDeck: any; 
  hand: any;
  mainDeckCopy: any;
  mulligan: any;
  draws: number = 0;

  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.getHand();
  }

  getHand() {
    this.draws = 1;
    this.mulligan = [];
    this.mainDeckCopy = [...this.shuffleDeck(this.mainDeck)];
    this.hand = this.mainDeckCopy.splice(0, 6);
  }

  addMulligan(index: any) {
      let idx = this.mulligan.indexOf(index);
      idx === -1 ? this.mulligan.push(index) : this.mulligan.splice(idx, 1);
  }  

  mulliganHand() {
    let length = this.mulligan.length;
    this.mulligan = this.mulligan.sort((a: any, b:any) => b - a );
    for(let i = 0; i < this.mulligan.length; i++) {
      this.mainDeckCopy.push(this.hand[this.mulligan[i]]);
      this.hand.splice(this.mulligan[i], 1);
    }
    this.mainDeckCopy = [...this.shuffleDeck(this.mainDeckCopy)];
    let newCards = this.mainDeckCopy.splice(0, length);
    this.hand = this.hand.concat(newCards);
    this.mulligan = [];
    this.draws = 0;
  }

  private shuffleDeck(deck: any) {
    let max = deck.length;
    for(let i = 0; i < deck.length; i++) {
      let randomNumber = Math.floor(Math.random() * max);
      let cardOne = deck[i];
      let cardTwo = deck[randomNumber];
      deck[i] = cardTwo;
      deck[randomNumber] = cardOne;
    }
    return deck;
  }

  dismiss() {
    this.activeModal.dismiss()
  }
}
