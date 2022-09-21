import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStoreService } from './user-store.service';
import { ForgotPasswordStatus, UserAuthStatus } from './user.model';
import { ErrorStoreService } from '../error/error-store.service';
import { ErrorType } from '../error/error.model';
import { LoadingStoreService } from '../loading/loading-store.service';
import { LoadingStatus } from '../loading/loading.model';

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
    private userStore: UserStoreService,
    private errorStore: ErrorStoreService,
    private loadingStore: LoadingStoreService
  ) { }

  login(formValue:Object) {
    this.loadingStore.loading = LoadingStatus.AUTH_LOADING;
    this.userStore.authenticating = UserAuthStatus.WORKING;
    return this.httpClient.post( `${this.url}auth/login`, {formValue}, this.httpOptions).pipe(
      map(({body}: any) => {
        this.userStore.authenticating = UserAuthStatus.SUCCESS;
        localStorage.setItem('token', body.token);
        this.userStore.authenticated = true;
      }),
      catchError((err: any) => {
        this.userStore.authenticating = UserAuthStatus.FAILED;
        this.errorStore.errorMessage = ErrorType.AUTHENTICATION_ERROR;
        return err;
      })
    )
  }

  register(formValue: Object) {
    this.loadingStore.loading = LoadingStatus.REGISTER_LOADING;
    this.userStore.authenticating = UserAuthStatus.WORKING;
    return this.httpClient.post(`${this.url}/auth/register-new`, {formValue}, this.httpOptions).pipe(
      map(({body} : any) => {
        this.userStore.authenticating = UserAuthStatus.SUCCESS;
      }),
      catchError((err: any) => {
        this.userStore.authenticating = UserAuthStatus.FAILED;
        this.errorStore.errorMessage = ErrorType.REGISTRATION_ERROR;
        return err;
      })
    );
  }

  forgotPassword(formValue: ForgotPasswordForm) {
    this.loadingStore.loading = LoadingStatus.FORGOT_PASSWORD_LOADING;
    return this.httpClient.get(`${this.url}password-forgot`, {params:{'email': formValue.emailAddress}}).pipe(
      map(({body}: any) => {
        this.loadingStore.loading = LoadingStatus.IDLE;
        this.userStore.forgotPassword = ForgotPasswordStatus.EMAIL_SENT;
      })
    )
  }

  check() {
    this.loadingStore.loading = LoadingStatus.AUTH_LOADING;
    this.userStore.authenticating = UserAuthStatus.WORKING;
    if(this.httpOptions.headers.get('Authorization') === null) {
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    }
    return this.httpClient.get(`${this.url}auth/check`,this.httpOptions).pipe(
      map(({body} : any) => {
        console.log('hit');
        this.loadingStore.loading = LoadingStatus.IDLE;
        this.userStore.authenticating = UserAuthStatus.SUCCESS;
        this.userStore.authenticated = true;
      }),
      catchError((err: any) => {
        this.userStore.authenticating = UserAuthStatus.FAILED;
        this.errorStore.errorMessage = ErrorType.AUTHENTICATION_ERROR;
        this.userStore.authenticated = false;
        return err;
      })
    );
  }

  getUser(){
    if(this.httpOptions.headers.get('Authorization') === null) {
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    }
    return this.httpClient.get(`${this.url}auth/user`, this.httpOptions).pipe(
      map(({body} : any) => {
        this.userStore.user = body;
      })
    );
}


  logout(){
    this.httpOptions.headers.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    this.loadingStore.loading = LoadingStatus.AUTH_LOADING;
    this.userStore.authenticating = UserAuthStatus.WORKING;
    this.httpClient.post(`${this.url}auth/logout`, null, this.httpOptions).pipe(
      map(({body} : any) => {
        this.loadingStore.loading = LoadingStatus.IDLE;
        this.userStore.authenticating = UserAuthStatus.SUCCESS;
        this.userStore.authenticated = false;
        localStorage.clear();
      })
    )
  }

}
