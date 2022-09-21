import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingStoreService } from '../../api/loading/loading-store.service';
import { UserStoreService } from '../../api/user/user-store.service';
import { UserService } from '../../api/user/user.service';
import { takeUntil } from 'rxjs/operators';
import { UserAuthStatus } from '../../api/user/user.model';
import { LoadingStatus } from '../../api/loading/loading.model';
import { ErrorType } from '../../api/error/error.model';
import { ErrorStoreService } from '../../api/error/error-store.service';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirmation: ['', Validators.required],
    emailAddress: ['', [Validators.required, Validators.email]],
    emailAddressConfirmation: ['', [Validators.required, Validators.email]], 
  }, {
    validators: [
      this.mustMatch('password', 'passwordConfirmation'),
      this.mustMatch('emailAddress', 'emailAddressConfirmation')
    ]
  });
    
  authenticating$ = this.userStore.authenticating$.pipe();
  loading$ = this.loadingStore.loading$.pipe();
  onDestroy$ = new Subject();

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private userStore: UserStoreService,
    private loadingStore: LoadingStoreService,
    private errorStore: ErrorStoreService
  ) { }

  get firstName() {
    return this.registrationForm.controls['firstName'];
  }

  get lastName() {
    return this.registrationForm.controls['lastName'];
  }

  get userName() {
    return this.registrationForm.controls['userName'];
  }

  get password() {
    return this.registrationForm.controls['password'];
  }

  get passwordConfirmation() {
    return this.registrationForm.controls['passwordConfirmation'];
  }

  get emailAddress() {
    return this.registrationForm.controls['emailAddress'];
  }

  get emailAddressConfirmation() {
    return this.registrationForm.controls['emailAddressConfirmation'];
  }

  get loadingStatus() {
    return LoadingStatus;
  }

  ngOnInit(): void {
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

  submitRegistration(){
    this.userService.register(this.registrationForm.value);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  private mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
}
