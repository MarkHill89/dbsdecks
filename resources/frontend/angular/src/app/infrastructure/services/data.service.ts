import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '@dbsdecks/environments/environment'
import {HttpClient} from '@angular/common/http';

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
  
}
