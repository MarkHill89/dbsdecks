import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from '../shared/modals/success-modal/success-modal.component';
import {DataService, AuthService} from "@dbsdecks/app/infrastructure/services/";
import { UpdatePasswordComponent } from '@dbsdecks/app/shared/modals/update-password/update-password.component';
import { Router } from '@angular/router';

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
    private route: Router,
    private modal: NgbModal,
    private dataService:DataService,
    private authService: AuthService){
      this.dataService.isActiveDeck.subscribe(id => {
        this.fetchData();
      })
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
      Promise.reject(e);
    }
  }
  updatePassword(){
    this.modal.open(UpdatePasswordComponent);
  }

  deleteDeck(deckId:number){
    this.dataService.deleteDeck(deckId).subscribe( event =>{
      
      const modalRef = this.modal.open(SuccessModalComponent);        
      modalRef.componentInstance.successMessage = event.message;
      this.dataService.isActiveDeck.next(deckId);
    });
  }

  editDeck(deckId:number){

    this.route.navigateByUrl(`/deckbuilder?id=${deckId}&action=edit`);

  }

}
