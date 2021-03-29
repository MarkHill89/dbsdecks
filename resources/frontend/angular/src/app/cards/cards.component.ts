import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'cards-component',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardsComponent implements OnInit {
  cardsList;
  constructor(private http:HttpClient) {

   }

  ngOnInit(): void {
    this.http.get("https://jsonplaceholder.typicode.com/albums/1/photos")
      .subscribe((data)=> this.displayCards(data));
  }

  displayCards(data){
    this.cardsList = data;
  }

}
