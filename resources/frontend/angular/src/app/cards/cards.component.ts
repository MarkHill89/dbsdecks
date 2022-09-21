import { Component, OnInit, ViewEncapsulation, OnDestroy, HostListener, Inject } from '@angular/core';
import { CardsQuery } from './state/cards.query';
import { CardsService } from './state/cards.service';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Card } from './state/card.model';
import { CardFilterModalComponent } from '../shared/modals/card-filter-modal/card-filter-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterCards } from '@dbsdecks/app/infrastructure/classes/card-filter.class';
import { DOCUMENT } from '@angular/common';
import { CardInfoModalComponent } from '../shared/modals/card-info-modal/card-info-modal.component';

@Component({
  selector: 'cards-component',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnDestroy{
  
  private cards: Card[] = [];
  private scrollSum = 24;
  private cardFilters = {};

  subscriptions: Subscription  = new Subscription;
  scrollCards: Card[] = [];

  windowScrolled: boolean = false;
  isBusy:boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private query: CardsQuery,
    private cardsService: CardsService,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.query.cards$.subscribe((cards: Card[]) => {
      this.isBusy = true;
      if(cards.length) {
        this.cards = cards;
        this.scrollCards = cards.slice(0, 24);
        this.isBusy = false;
      } else {
        this.subscriptions.add(this.cardsService.get().subscribe())
      }
    }));
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
      if(window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop > 100) {
        this.windowScrolled = true;
      }else if (this.windowScrolled && window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop < 10) {
        this.windowScrolled = false;
      }
  }

  scrollToTop() {
    (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    })();
  }

  onScrollDown() {
    const cardsToAdd = FilterCards(this.cards, this.cardFilters).slice(this.scrollSum, this.scrollSum + 12);
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

  openFilters(title: string) {
    const modalRef = this.modal.open(CardFilterModalComponent)
    modalRef.componentInstance.modalTitle = title;
    modalRef.componentInstance.cardFilters = this.cardFilters;
    modalRef.componentInstance.cardFilterValues.subscribe((cardFilterValues: any) => {
      this.scrollSum = 24;
      this.scrollToTop();
      this.scrollCards = FilterCards(this.cards, cardFilterValues).slice(0, this.scrollSum);
      this.cardFilters = cardFilterValues
    })
  }

  openCardView(card: Card) {
    const modalRef = this.modal.open(CardInfoModalComponent)
    modalRef.componentInstance.card = card;
  }
}
