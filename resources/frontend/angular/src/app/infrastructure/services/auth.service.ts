import { Injectable, TemplateRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '@dbsdecks/environments/environment'
import { BehaviorSubject, Observable } from "rxjs";
import { Router} from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from '@dbsdecks/app/shared/modals';

@Injectable()
export class AuthService {
    modalRef?: BsModalRef;

    private baseUrl: string = environment.baseUrl;
    public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private router: Router,
        private modalService: BsModalService,
        private http: HttpClient) { 
    }

    canActivate():boolean{
        let token = localStorage.getItem('token');

        if(!token){
            this.modalRef = this.modalService.show(ErrorModalComponent);
            return false;
        } else{
        }
        return true;
    }

    login(username:string, password:string):Observable<any>{
        return this.http.post(this.baseUrl + "auth/login", {username, password});
    }
    registerNew(credentials:object):Observable<any>{
        return this.http.post(this.baseUrl + "auth/register-new", {credentials});
    }
    logout():Observable<any>{
        return this.http.post(this.baseUrl + "auth/logout",{})
    }
  
  
}
