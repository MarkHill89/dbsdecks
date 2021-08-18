import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DataService, AuthService} from "@dbsdecks/app/infrastructure/services/";

@Component({
  selector: 'portal-view',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PortalComponent implements OnInit {
  authenticated = false;
  user:any;
  deckLists:any=[];
  maxSize = 5;
  page = 1;
  pageSize:number = 15;
  key = "id";
  reverse = true; // Default sort descending
  deckListsLoaded = false;

  constructor(
    private dataService:DataService,
    private authService: AuthService){
  }

  getCurrentUser(){
    this.authService.getUser().subscribe(res =>{
      this.user = res;
    })
  }
    
  ngOnInit() {
    this.fetchData();
  }


  // Sorting function
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  // --- End Sorting ---

  async fetchData(): Promise<any>{
    try{
      await this.getCurrentUser();
      await this.dataService.getDeckByUser().subscribe(data => {
        this.deckLists = data;
      });

      this.sort(this.key);
      this.deckListsLoaded = true;
    } catch(e){
      console.log(e);
    }
  }

}
