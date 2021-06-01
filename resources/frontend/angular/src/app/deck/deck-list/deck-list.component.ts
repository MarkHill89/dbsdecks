import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {DataService} from '@dbsdecks/app/infrastructure/services/data.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DeckListComponent implements OnInit{
  deckLists:any= [];
  returnedDeckList:any = [];
  deckListsLoaded = false;
  maxSize = 5;
  page = 1;
  pageSize = 10;
  total = 0;
  showBoundaryLinks: boolean = true;
  showDirectionLinks: boolean = true;

  constructor(
    protected dataService:DataService
  ) {}

  ngOnInit(){
    this.fetchData();
  }

   async fetchData(): Promise<any> {
    try{
        this.deckLists = await this.dataService.getDeckListAll(1,'0');
        this.returnedDeckList = this.deckLists.slice(0, 10);
        this.total = this.deckLists.length;
        this.deckListsLoaded = true;
       
    } catch(e){
      console.log(e);
    }
   }

   pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedDeckList = this.deckLists.slice(startItem, endItem);
  }
  
}
