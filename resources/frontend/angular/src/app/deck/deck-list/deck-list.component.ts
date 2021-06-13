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
  leadersLists:any = [];
  returnedDeckList:any = [];
  deckListsLoaded = false;
  maxSize = 5;
  page = 1;
  pageSize:number = 10;
  total:number = 0;
  showBoundaryLinks: boolean = true;
  showDirectionLinks: boolean = true;
  filter:any = undefined;
  selectedLeader:any = undefined;
  selectedLeaderName:any = undefined;
  

  constructor(
    protected dataService:DataService
  ) {}

  ngOnInit(){
    this.fetchData();
  }

  // --- Sorting ---
  key = "submitDate";
  reverse = false; // Default sort ascending
  // reverse = true; // Default sort descending

  // Sorting function
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  // --- End Sorting ---

   async fetchData(): Promise<any> {
    try{
        this.leadersLists = await this.dataService.getLeaders();
        this.deckLists = await this.dataService.getDeckListAll(1,'0');
        this.total = this.deckLists.length;
        this.deckListsLoaded = true;

        this.sort(this.key);
       
    } catch(e){
      console.log(e);
    }
   }

  search(){
    if(this.filter){
      this.ngOnInit();
    } else{
      this.deckLists = this.deckLists.filter((res:any) => {
        return res.title.toLocaleLowerCase().match(this.filter.toLocaleLowerCase());
      })
    }
  }

  selectLeader(event:any){
    this.selectedLeaderName = event.cardName;
    
  }

  
}
