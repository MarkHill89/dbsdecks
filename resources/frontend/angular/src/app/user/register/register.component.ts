import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingStatus } from '../../api/loading/loading.model';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppState } from '@dbsdecks/app/state/app.state';
import { Store } from '@ngrx/store';

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
    
  onDestroy$ = new Subject();

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private store: Store<AppState>
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

  }

  submitRegistration(){
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
