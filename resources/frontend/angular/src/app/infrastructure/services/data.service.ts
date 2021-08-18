import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { environment } from '@dbsdecks/environments/environment';

import { Router} from "@angular/router";
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class DataService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { 
  
  }
  getCardList(){
    return this.http
            .get(this.baseUrl + "card")
            .pipe(map(data => {return data}))
  }

  getDeckListAll(isPublic:any, leaderCardNumber:string){
    let params = new HttpParams();
    params = params.append('isPublic', isPublic);
    params = params.append('leaderCard', leaderCardNumber);

    return this.http
            .get(this.baseUrl + "deck/list", {params: params})
            .pipe(map(data => {return data}))
            .toPromise();
  }
  getDeckListData(id:any){
    let params = new HttpParams();
    params = params.append('deckId', id);

    return this.http
            .get(this.baseUrl + "deck/list/view/", {params: params})
            .pipe(map(data =>{
              return data
            }))
  }

  getDeckViewData(id:any){
    let params = new HttpParams();
    params = params.append('deckId', id);

    return this.http
            .get(this.baseUrl + "deck/list/view-deck/", {params: params})
            .pipe(map(data =>{
              return data
            }))
  }
  getDeckByUser(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(this.baseUrl + "auth/deck-by-user/", {headers})
  }


  getLeaders(){
    return this.http
    .get(this.baseUrl + "deck/get-leaders")
    .pipe(map(data =>{
      return data
    }))
    .toPromise();
  }
  
  getTrendingLeaders() {
    return this.http
      .get(this.baseUrl + "deck/trending-leaders")
      .pipe(map(data => data))
      .toPromise();
  }
  
  submitDeck(deck:Object):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(this.baseUrl + "auth/deck-submit", {deck}, {headers})
            .pipe(
              map(data => {return data}),
              catchError(error => error)
            )
  }
}
