import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ForgotPasswordStatus, User, UserAuthStatus } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private readonly _authenticated = new BehaviorSubject(false);
  readonly authenticated$ = this._authenticated.asObservable();

  private readonly _authenticating = new BehaviorSubject(UserAuthStatus.IDLE);
  readonly authenticating$ = this._authenticating.asObservable();

  private readonly _forgotPassword = new BehaviorSubject(ForgotPasswordStatus.IDLE);
  readonly forgotPassword$ = this._forgotPassword.asObservable();

  private readonly _user = new BehaviorSubject({} as User);
  readonly user$ = this._user.asObservable();

  constructor() { }

  get authenticated() : boolean {
    return this._authenticated.getValue() ?? false;
  }

  set authenticated(authenticated: boolean) {
    this._authenticated.next(authenticated);
  }

  get authenticating() : UserAuthStatus {
    return this._authenticating.getValue() ?? UserAuthStatus.IDLE;
  }

  set authenticating(authenticating: UserAuthStatus) {
    this._authenticating.next(authenticating);
  }

  get forgotPassword(): ForgotPasswordStatus {
    return this._forgotPassword.getValue() ?? ForgotPasswordStatus.IDLE;
  }

  set forgotPassword(forgotPassword) {
    this._forgotPassword.next(forgotPassword);
  }

  get user() {
    return this._user.getValue() ?? {};
  }

  set user(user) {
    this._user.next(user);
  }
}
