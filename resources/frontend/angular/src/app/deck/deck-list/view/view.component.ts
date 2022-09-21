import { Component, OnInit, ViewEncapsulation, ɵɵsetComponentScope, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {DataService, AuthService} from '@dbsdecks/app/infrastructure/services/';
import { SampleHandModalComponent } from '@dbsdecks/app/shared/modals/sample-hand-modal/sample-hand-modal.component';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Card } from '../../../cards/state/card.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PresenterModalComponent } from '@dbsdecks/app/shared/modals/presenter-modal/presenter-modal.component';

declare let gtag: Function;

@Component({
  selector: 'decklist-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DeckListViewComponent implements OnInit, OnDestroy{

  isBusy = false;
  deckId:any;
  leaderId:any;
  deckList:any= [];
  deckInfo:any= [];
  deckListLoaded:boolean = false;
  leaderFrontImage = '';
  leaderBackImage = '';
  mainDeckQty = 0;
  sideDeckQty = 0;
  mainDeckCost = 0;
  sideDeckCost = 0;
  totalCost = 0;
  view = 'basic' // 'basic', 'cost', 'color', 'type'

  currentUser$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  owner$: BehaviorSubject<String> = new BehaviorSubject<String>("Unknown");
  userId$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  title$: BehaviorSubject<String> = new BehaviorSubject<String>('Unknown Deck Title');
  leader$: BehaviorSubject<Card> = new BehaviorSubject<Card>({} as Card);
  mainDeck$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([] as Card[]);
  sideDeck$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([] as Card[]);
  subscriptions: Subscription = new Subscription;
  view$: BehaviorSubject<String> = new BehaviorSubject<String>('basic');

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dataService:DataService,
    private authService:AuthService,
    private modal: NgbModal
  ) { 
    this.deckId = this.route.snapshot.paramMap.get('id');
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        gtag('config', 'UA-114061835-1', {
            'page_path': event.urlAfterRedirects
        });
      }
    })
  }

  ngOnInit(){
    this.isBusy = true;
    this.subscriptions.add(this.dataService.getDeckListData(this.deckId).subscribe((data: any) => {
      this.leader$.next(data)
      this.title$.next(data.title)
      this.owner$.next(data.username);
      this.userId$.next(data.userId);
    }));
    this.subscriptions.add(this.dataService.getDeckViewData(this.deckId).subscribe((data: any) => {
      this.isBusy = true;
      this.mainDeck$.next(data.mainDeck);
      this.sideDeck$.next(data.sideDeck);
      this.mainDeckCost = data.mainDeck.reduce((acc:any, curr:any) => acc + curr.price, 0);
      this.sideDeckCost = data.sideDeck.reduce((acc:any, curr:any) => acc + curr.price, 0);
      this.totalCost = this.mainDeckCost + this.sideDeckCost;
      this.isBusy = false;
    }));
    this.getCurrentUser();
  }

  switchView(view: string) {
    this.view = view;
    this.view$.next(view);
  }

  sortByColor(deck: any, filter: string) : Card[]{
    if(filter === 'multi') {
      return deck.filter((card: Card) => card.color.match(/\;/));
    } 
    return deck.filter((card: Card) => card.color === filter);
  }

  sortByCost(deck: any, filter: number) : Card[] {
    switch(filter) {
      case 1: return deck.filter((card: Card) => card.energyCost <= 1);
      case 2: return deck.filter((card: Card) => card.energyCost == 2);
      case 3: return deck.filter((card: Card) => card.energyCost == 3);
      case 4: return deck.filter((card: Card) => card.energyCost == 4);
      case 5: return deck.filter((card: Card) => card.energyCost == 5);
      case 6: return deck.filter((card: Card) => card.energyCost >= 6);
    }
    return [];
  }

  sortByType(deck: any, filter: string) : Card[] {
    return deck.filter((card: Card) => card.cardType === filter);
  }

  editDeck(){
    this.router.navigateByUrl(`/deckbuilder?id=${this.deckId}&action=edit`);
  }

  copyDeck(){
    this.router.navigateByUrl(`/deckbuilder?id=${this.deckId}&action=copy`);
  }

  getCurrentUser(){
    this.authService.getUser().subscribe((res:any) =>{
      if(res){
        this.currentUser$.next(res.id);
        if (this.currentUser$.getValue() === this.userId$.getValue() ){
          this.isUser$.next(true);
        }
      }
    })
  }
  presentDeck() {
    const modalRef = this.modal.open(PresenterModalComponent, { size: 'xl'});

    modalRef.componentInstance.leaderCard = this.leader$.getValue();
    modalRef.componentInstance.mainDeck = [...this.mainDeck$.getValue()];
    modalRef.componentInstance.sideDeck = [...this.sideDeck$.getValue()];
  }

  getSampleHand() {
    const modalRef = this.modal.open(SampleHandModalComponent, { size: 'xl'})
    modalRef.componentInstance.mainDeck = [...this.mainDeck$.getValue()];
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
