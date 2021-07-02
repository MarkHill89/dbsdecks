import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from '@dbsdecks/app/infrastructure/services/data.service';

@Component({
  selector: 'decklist-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DeckListViewComponent implements OnInit{
  deckId:any;
  deckList:any= [];
  deckListLoaded:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService:DataService
  ) { 
    this.deckId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(){
    this.fetchData();
  }

  async fetchData(): Promise<any> {
    try {
      this.deckList = await this.dataService.getDeckListData(this.deckId);
      this.deckListLoaded = true;
    } catch (e) {
      Promise.reject(e);
    }
  }

}
