import { Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Card } from '../../../../api/card/card.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CardSearchModalComponent } from '@dbsdecks/app/shared/modals/card-search-modal/card-search-modal.component';
import { takeUntil } from 'rxjs/operators';


export interface listUpdateEvent {
  list?: Card[]
  type: string
}

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.scss']
})
export class ViewSectionComponent implements OnInit, OnDestroy {

  @Input() editing: boolean | null = false;
  @Input() header: string = '';
  @Input() deck : string = '';
  @Input() cards: Card[] | undefined = [];
  @Input() list: Card[] | undefined = [];

  @Output() throwList = new EventEmitter<Card>();

  onDestroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private modalService: BsModalService,) { }

  bsModalRef?: BsModalRef;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.onDestroy$.next(false);
    this.onDestroy$.complete();
  }

  cardSearch() {
    this.bsModalRef = this.modalService.show(CardSearchModalComponent);
    this.bsModalRef.content.onCardSelect.pipe(takeUntil(this.onDestroy$)).subscribe((event: any) => {

      if(!this.list) {
        return;
      }

      let listIdx = (this.list) ? this.list?.map((listItem: Card) => listItem.cardNumber).indexOf(event.card.cardNumber) : -1;
      if(listIdx < 1) {
        let card = {...event.card};
        card.mainDeckQty = this.deck === 'main' ? event.qty : 0
        card.sideDeckQty = this.deck === 'side' ? event.qty : 0
        card.zDeckQty = this.deck === 'zdeck' ? event.qty : 0
        
        this.list.push(card)

      } else {

        if(this.deck === 'main' && this.list) {
          let qty = this.list[listIdx].mainDeckQty + event.qty > 4 ? 
            this.list[listIdx].mainDeckQty : this.list[listIdx].mainDeckQty + event.qty;
          this.list[listIdx] = {...this.list[listIdx], mainDeckQty : qty}
          let totalDeckCount = this.list[listIdx].mainDeckQty + this.list[listIdx].sideDeckQty;

          if(totalDeckCount > 4) { // change to cardLimit
            let qty = this.list[listIdx].mainDeckQty - this.list[listIdx].sideDeckQty;
            this.list[listIdx] = {...this.list[listIdx], sideDeckQty : qty}
          }
        }
    
        if(this.deck === 'side' && this.list) {
          let qty = this.list[listIdx].sideDeckQty + event.qty > 4 ? 
            this.list[listIdx].sideDeckQty : this.list[listIdx].sideDeckQty + event.qty;
          this.list[listIdx] = {...this.list[listIdx], sideDeckQty : qty}

          let totalDeckCount = this.list[listIdx].cardType.indexOf('Z') > -1 ? this.list[listIdx].zDeckQty + this.list[listIdx].sideDeckQty :
            this.list[listIdx].mainDeckQty + this.list[listIdx].sideDeckQty;
          if(totalDeckCount > 4 && this.list[listIdx].cardType.indexOf('Z') > -1) { // change to cardLimit
            let qty = this.list[listIdx].zDeckQty - this.list[listIdx].sideDeckQty;
            this.list[listIdx] = {...this.list[listIdx], zDeckQty : qty}
          } else { 
            let qty = this.list[listIdx].mainDeckQty - this.list[listIdx].sideDeckQty;
            this.list[listIdx] = {...this.list[listIdx], mainDeckQty: qty}
          }
        }
    
        if(this.deck === 'zdeck' && this.list) {
          let qty = this.list[listIdx].zDeckQty + event.qty > 4 ? 
            this.list[listIdx].zDeckQty : this.list[listIdx].zDeckQty + event.qty;
          this.list[listIdx] = {...this.list[listIdx], zDeckQty: qty}
          
          let totalDeckCount = this.list[listIdx].zDeckQty + this.list[listIdx].sideDeckQty;
          if(totalDeckCount > 4) { // change to cardLimit
            let qty = this.list[listIdx].zDeckQty - this.list[listIdx].sideDeckQty;
            this.list[listIdx] = {...this.list[listIdx], sideDeckQty : qty}
          }
        }
      }

      // throw card event here
    })
  }

  addRemoveCard(_qty: number, cardNumber: String) {
    let listIdx = (this.list) ?  this.list?.map((listItem: Card) => listItem.cardNumber).indexOf(cardNumber) : -1;
    
    if(listIdx < 0 || this.list === undefined) return;
    let card : Card = Object.assign({}, this.list[listIdx])

    if(this.deck === 'main' && this.list) {
      let qty = card.mainDeckQty + _qty > 4 ? card.mainDeckQty : card.mainDeckQty + _qty;
      card = {...card, mainDeckQty : qty}
      let totalDeckCount = card.mainDeckQty + card.sideDeckQty;

      if(totalDeckCount > 4) { // change to cardLimit
        let qty = card.mainDeckQty - card.sideDeckQty;
        card = {...card, sideDeckQty : qty}
      }
    }

    if(this.deck === 'side' && this.list) {
      let qty = card.sideDeckQty + _qty > 4 ? card.sideDeckQty : card.sideDeckQty + _qty;
      card = {...card, sideDeckQty : qty}

      let totalDeckCount = card.cardType.indexOf('Z') > -1 ? card.zDeckQty + card.sideDeckQty :
        card.mainDeckQty + card.sideDeckQty;
      if(totalDeckCount > 4 && card.cardType.indexOf('Z') > -1) { // change to cardLimit
        let qty = card.zDeckQty - card.sideDeckQty;
        card = {...card, zDeckQty : qty}
      } else { 
        let qty = card.mainDeckQty - card.sideDeckQty;
        card= {...card, mainDeckQty: qty}
      }
    }

    if(this.deck === 'zdeck' && this.list) {
      let qty = card.zDeckQty + _qty > 4 ? card.zDeckQty : card.zDeckQty + _qty;
      card= {...card, zDeckQty: qty}
      let totalDeckCount = card.zDeckQty + card.sideDeckQty;
      if(totalDeckCount > 4) { // change to cardLimit
        let qty = card.zDeckQty - card.sideDeckQty;
        card = {...card, sideDeckQty : qty}
      }
    }

    this.throwList.emit(card)
  }
}
