import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DataService} from "@dbsdecks/app/infrastructure/services/"
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'cards-component',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardsComponent implements OnInit {
  cardsList:any = [];
  constructor(
    private dataService:DataService
  ) {

   }

  ngOnInit(): void {
   this.getCards(); 
  }

  async getCards(){
    try{
      this.cardsList = await this.dataService.getCardList()
      .subscribe(data =>{
        this.cardsList = data;
      })
    } catch(e){
      console.log(e);
    }
    
  }

}
