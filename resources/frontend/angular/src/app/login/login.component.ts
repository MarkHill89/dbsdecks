import { Component, OnInit, ViewChild, ElementRef, NgModule,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {Location} from '@angular/common';

import {AuthService} from "@dbsdecks/app/infrastructure/services/";

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  previousUrl: string = '';

  error = null;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password : ['', Validators.required]
  });
  
  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private _location: Location
  ) {  }

  submitLogin(){

    this.authService.login(this.loginForm.value).subscribe(res =>{
      localStorage.setItem('token', res.token);
      if(res){
        this.error = null;
        this._location.back();
      }

        
    },err => {
      this.error = err.error.message;
    });
    
  }

}
