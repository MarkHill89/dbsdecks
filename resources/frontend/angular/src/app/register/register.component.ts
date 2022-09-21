import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router} from '@angular/router';

import {AuthService} from '@dbsdecks/app/infrastructure/services/auth.service';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'register-new-user-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent{
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
    
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private _location: Location,
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

  submitRegistration(){
    try{
      this.authService.registerNew(this.registrationForm.value).subscribe( res =>{
        if(res){
          localStorage.setItem('token', res.token);
          this.authService.isAuthenticated$.next(true);
        }
      });
    }catch(err){
      Promise.reject(err);
    }
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
