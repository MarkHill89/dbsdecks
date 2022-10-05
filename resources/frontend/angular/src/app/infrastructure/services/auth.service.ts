import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from '@dbsdecks/environments/environment'
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router} from "@angular/router";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    modalRef?: BsModalRef;
    isAuthenticated$: BehaviorSubject<boolean>  = new BehaviorSubject<boolean>(false);
    private baseUrl: string = environment.baseUrl;

    constructor(
        private router: Router,
        private modalService: BsModalService,
        private http: HttpClient) {
            this.isAuthenticated$.next(false);
    }

    canActivate():boolean{
        let token = localStorage.getItem('token');

        if(!token){
            this.router.navigateByUrl('/login');
            return false;
        }
        return true;
    }

    check() : Observable<any | Observable<string>>{
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.get(this.baseUrl + "auth/check",{headers}).pipe(
            catchError((error) => {
                let errorMsg: string;
                if(error instanceof HttpErrorResponse) {
                    errorMsg = error.error.message;
                } else {
                    errorMsg = error.message;
                }
                return throwError(errorMsg)
            }) 
        );
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

    isUserNameTaken(userName: string): Observable<any> {
        return this.http.get(this.baseUrl + "auth/username-check", {params: { 
            'userName': userName
        }});
    }

    isEmailTaken(email: string): Observable<any> {
        return this.http.get(this.baseUrl + "auth/email-check", {params: {
            'email':email
        }});
    }

    forgotPassword(email:string):Observable<any>{
        
        return this.http.get(this.baseUrl + "password-forgot", {params:{
            'email':email
        }});
    }

    updatePassword(password:string):Observable<any>{
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });

        return this.http.post(this.baseUrl + "auth/update-password", {password:password}, {headers})
    }
  
  
}
