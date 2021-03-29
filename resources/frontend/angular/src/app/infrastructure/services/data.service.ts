import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from "@angular/common/http"

@Injectable()
export class DataService {


  constructor(private http: HttpClient) { 
  
  }

  
}
