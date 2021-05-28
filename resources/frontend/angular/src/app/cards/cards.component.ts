import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CardsQuery } from './state/cards.query';
import { CardsService } from './state/cards.service';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Card } from './state/card.model';

@Component({
  selector: 'cards-component',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnDestroy{
  
  private cards: Card[] = [];
  private scrollSum = 24;

  subscriptions: Subscription  = new Subscription;
  scrollCards: Card[] = [];

  constructor(
    private query: CardsQuery,
    private cardsService: CardsService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.query.cards$.subscribe((cards: Card[]) => {
      if(cards.length) {
        this.cards = cards;
        this.scrollCards = cards.slice(0, 24)
      } else {
        this.subscriptions.add(this.cardsService.get().subscribe())
      }
    }));
  }

  onScrollDown() {
    const cardsToAdd = this.cards.slice(this.scrollSum, this.scrollSum + 12);
    this.scrollSum += 12;
    cardsToAdd.forEach(card => {
      this.scrollCards.push(card);
    });
  }

  cardId(index: number, item: Card) {
    return item.cardNumber;
  }

  cardImage(imageString: string) {
    return imageString.split(';')[0];
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
