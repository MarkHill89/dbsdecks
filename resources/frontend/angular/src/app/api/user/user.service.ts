import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ForgotPasswordForm {
  emailAddress: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.baseUrl;
  private httpOptions = {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'),
      observe: 'response' as 'body'
  }

  constructor(
    private httpClient: HttpClient,
  ) { }

  login (formValue: Object) {
    return this.httpClient.post(`${this.url}auth/login`, {formValue}, this.httpOptions).pipe(
      map(({body} : any) => body.token)
    )
  }

  logout(){
    if(this.httpOptions.headers.get('Authorization') === null) {
       this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    }
    return this.httpClient.post(`${this.url}auth/logout`, null, this.httpOptions).pipe(
      map(({body} : any) => body)
    )
  }

  check() {
    if(this.httpOptions.headers.get('Authorization') === null) {
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    }
    return this.httpClient.get(`${this.url}auth/check`, this.httpOptions).pipe(
      map(({body} : any) => body)
    );
  }


  register(formValue: Object) {
    return this.httpClient.post(`${this.url}/auth/register-new`, {formValue}, this.httpOptions).pipe(
      map(({body} : any) => {

      }),
      catchError((err: any) => {
        return throwError(() => err);
      })
    );
  }

  forgotPassword(formValue: ForgotPasswordForm) {
    return this.httpClient.get(`${this.url}password-forgot`, {params:{'email': formValue.emailAddress}}).pipe(
      map(({body}: any) => {
      })
    )
  }

  

  getUser(){
    if(this.httpOptions.headers.get('Authorization') === null) {
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    }
    return this.httpClient.get(`${this.url}auth/user`, this.httpOptions).pipe(
      map(({body} : any) => {
      })
    );
  }
}
