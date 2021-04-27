import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { environment } from '@dbsdecks/environments/environment'
import { BehaviorSubject, Observable } from "rxjs";
import { Router} from "@angular/router";

@Injectable()
export class AuthService {

    private baseUrl: string = environment.baseUrl;
    public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private router: Router,
        private http: HttpClient) { 
    }

    check() {
        return this.http
            .get(this.baseUrl + "authlog")
            .pipe(map(data => {return data}));
    }
    login(username:string, password:string):Observable<any>{
        return this.http.post(this.baseUrl + "auth/login", {username, password})
    }
  
  
}
