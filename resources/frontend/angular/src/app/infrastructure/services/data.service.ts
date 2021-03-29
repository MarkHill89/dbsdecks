import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataService {
  
  constructor(private http: HttpClient) { 
  
  }
  getCardList(){
    return this.http
            .get("https://jsonplaceholder.typicode.com/albums/1/photos")
            .pipe(map(data => {return data}))
  }
  
}
