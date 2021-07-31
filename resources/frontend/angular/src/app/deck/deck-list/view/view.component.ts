import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {DataService} from '@dbsdecks/app/infrastructure/services/data.service';

declare let gtag: Function;

@Component({
  selector: 'decklist-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DeckListViewComponent implements OnInit{
  deckId:any;
  deckList:any= [];
  deckInfo:any= [];
  deckListLoaded:boolean = false;
  leaderImage:any;
  leaderFrontImage = '';
  leaderBackImage = '';
  mainDeckQty = 0;
  sideDeckQty = 0;

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
    this.fetchData();
  }

  async fetchData(): Promise<any> {
    try {
      this.deckList = await this.dataService.getDeckListData(this.deckId);
      this.deckInfo = await this.dataService.getDeckViewData(this.deckId);
      this.mainDeckQty = this.deckList.reduce((m:any,r:any) => m + r.mainDeckQty, 0);
      this.sideDeckQty = this.deckList.reduce((m:any,r:any) => m + r.sideDeckQty, 0);
      this.leaderImage = JSON.parse(this.deckInfo.leader);
      this.deckListLoaded = true;
    } catch (e) {
      Promise.reject(e);
    }
  }

}
