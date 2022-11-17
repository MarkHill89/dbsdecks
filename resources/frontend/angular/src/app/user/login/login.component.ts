import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../api/user/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject, catchError, of, throwError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserStoreService } from '../../api/user/user-store.service';
import { UserAuthStatus } from '../../api/user/user.model';
import { ErrorStoreService } from '../../api/error/error-store.service';
import { ErrorType } from '../../api/error/error.model';
import { LoadingStoreService } from '../../api/loading/loading-store.service';
import { LoadingStatus } from '../../api/loading/loading.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  showLogin = true;
  title = "Login";
  
  loginForm!: FormGroup;

  onDestroy$ = new Subject();

  authenticating$ = this.userStore.authenticating$.pipe();
  loading$ = this.loadingStore.loading$.pipe();
  errorType$ = this.errorStore.errorType$.pipe();
  errorMessage$ = this.errorStore.errorMessage$.pipe();

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userStore: UserStoreService,
    private errorStore: ErrorStoreService,
    private loadingStore: LoadingStoreService
  ) { }
  
  get loadingStatus() {
    return LoadingStatus;
  }

  get errorType() {
    return ErrorType;
  }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    })

    this.loading$.pipe(takeUntil(this.onDestroy$)).subscribe();
    this.authenticating$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((auth: any) => {
      switch(auth) {
        case UserAuthStatus.WORKING:
          break;
        case UserAuthStatus.SUCCESS:
          this.loadingStore.loading = LoadingStatus.IDLE;
          this.bsModalRef.hide();
          break;
        case UserAuthStatus.FAILED:
          this.loadingStore.loading = LoadingStatus.IDLE;
          if(this.errorStore.errorMessage === ErrorType.AUTHENTICATION_ERROR) {
            //todo add error messages
          }
          break;
      }
    })

  }

  login() {
    this.userService.login(this.loginForm.value).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe({
      next: res => {
        this.errorStore.unset()
      }, 
      error: err => {
        this.errorStore.errorMessage = err.error.message;
        this.errorStore.errorType = ErrorType.LOGIN_ERROR;
      }
    })
  }

  ngOnDestroy(): void {
      this.onDestroy$.next(true);
      this.onDestroy$.complete();
  }

}
