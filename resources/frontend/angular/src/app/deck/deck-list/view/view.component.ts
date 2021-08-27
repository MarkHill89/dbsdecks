import { Component, OnInit, ViewEncapsulation, ɵɵsetComponentScope, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {DataService} from '@dbsdecks/app/infrastructure/services/data.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Card } from '../../../cards/state/card.model';

declare let gtag: Function;

@Component({
  selector: 'decklist-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DeckListViewComponent implements OnInit, OnDestroy{
  deckId:any;
  leaderId:any;
  deckList:any= [];
  deckInfo:any= [];
  deckListLoaded:boolean = false;
  leaderFrontImage = '';
  leaderBackImage = '';
  mainDeckQty = 0;
  sideDeckQty = 0;
  title$ : BehaviorSubject<String> = new BehaviorSubject<String>('');
  leader$: BehaviorSubject<Card> = new BehaviorSubject<Card>({} as Card);
  mainDeck$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([] as Card[]);
  sideDeck$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([] as Card[]);
  subscriptions: Subscription = new Subscription;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dataService:DataService
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
    this.subscriptions.add(this.dataService.getDeckListData(this.deckId).subscribe((data: any) => {
      this.mainDeck$.next(data.mainDeck);
      this.sideDeck$.next(data.sideDeck);
    }));
    this.subscriptions.add(this.dataService.getDeckViewData(this.deckId).subscribe((data: any) => {
      this.leader$.next(data.leader)
      this.title$.next(data.title)
    }));
  }

  editDeck(){
    this.router.navigateByUrl(`/deckbuilder?id=${this.deckId}&action=edit`);
  }

  copyDeck(){
    this.router.navigateByUrl(`/deckbuilder?id=${this.deckId}&action=copy`);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
