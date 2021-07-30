import { Injectable, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '@dbsdecks/environments/environment'
import { BehaviorSubject, Observable } from "rxjs";
import { Router} from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from '@dbsdecks/app/shared/modals';

@Injectable()
export class AuthService {
    modalRef?: BsModalRef;
    isAuthenticated: BehaviorSubject<boolean>;
    private baseUrl: string = environment.baseUrl;

    constructor(
        private router: Router,
        private modalService: BsModalService,
        private http: HttpClient) {
            this.isAuthenticated = new BehaviorSubject<boolean>(false);
        }

    

    canActivate():boolean{
        let token = localStorage.getItem('token');

        if(!token){
            this.router.navigateByUrl('/login');
            return false;
        } else{
        }
        return true;
    }

    check(){
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.get(this.baseUrl + "auth/check",{headers});
    }

    login(formValue:Object):Observable<any>{
        return this.http.post(this.baseUrl + "auth/login", {formValue});
    }

    registerNew(credentials:object):Observable<any>{
        return this.http.post(this.baseUrl + "auth/register-new", {credentials});
    }

    logout(){
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.post(this.baseUrl + "auth/logout",null,{headers});
    }

    getUser(){
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.get(this.baseUrl + "auth/user",{headers});
    }

    forgotPassword(email:string):Observable<any>{
        
        return this.http.get(this.baseUrl + "auth/password-forgot", {params:{
            'email':email
        }});
    }
  
  
}
