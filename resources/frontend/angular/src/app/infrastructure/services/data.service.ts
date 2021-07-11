import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { environment } from '@dbsdecks/environments/environment'
import {HttpClient, HttpParams} from '@angular/common/http';

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
            .toPromise();
  }

  getDeckViewData(id:any){
    let params = new HttpParams();
    params = params.append('deckId', id);

    return this.http
            .get(this.baseUrl + "deck/list/view-deck/", {params: params})
            .pipe(map(data =>{
              return data
            }))
            .toPromise();
  }


  getLeaders(){
    return this.http
    .get(this.baseUrl + "deck/get-leaders")
    .pipe(map(data =>{
      return data
    }))
    .toPromise();
  }
  
  submitDeck(deck:Object):Observable<any>{
    return this.http.post(this.baseUrl + "deck/submit", {deck})
            .pipe(
              map(data => {return data}),
              catchError(error => error)
            )
  }
}
