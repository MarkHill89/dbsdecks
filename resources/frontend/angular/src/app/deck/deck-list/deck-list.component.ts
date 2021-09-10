import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {DataService} from '@dbsdecks/app/infrastructure/services/data.service';
import { NavigationEnd, Router,ActivatedRoute } from '@angular/router';

declare let gtag: Function;

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
  trendingLeaders:any = [];
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
  leaderId :any;
  

  constructor(
    private route: ActivatedRoute,
    protected dataService:DataService,
    public router: Router
  ) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        gtag('config', 'UA-114061835-1', {
            'page_path': event.urlAfterRedirects
        });
      }
    });
    this.route.queryParams.subscribe(
      params => {
        this.leaderId = params.lead;
      }
    )
      
  }

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
        this.deckLists = await this.dataService.getDeckListAll(1,'0', 0);
        this.trendingLeaders = await this.dataService.getTrendingLeaders();
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

    this.selectedLeaderName = this.leadersLists.find((item: { id: any; }) =>  item.id === event).cardName;
    this.leaderId = event.id;
  }

  
}
