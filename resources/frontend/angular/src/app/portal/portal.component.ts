import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {DataService, AuthService} from "@dbsdecks/app/infrastructure/services/";
import { UpdatePasswordComponent } from '@dbsdecks/app/shared/modals/update-password/update-password.component';
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
  reverse = false; // Default sort descending
  deckListsLoaded = false;

  constructor(
    private modal: NgbModal,
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
      this.getCurrentUser();
      this.dataService.getDeckByUser().subscribe(data => {
        this.deckLists = data;
      });

      this.sort(this.key);
      this.deckListsLoaded = true;
    } catch(e){
      console.log(e);
    }
  }
  updatePassword(){
    this.modal.open(UpdatePasswordComponent);
  }

}
