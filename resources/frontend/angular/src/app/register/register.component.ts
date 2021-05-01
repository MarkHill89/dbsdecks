import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router} from '@angular/router';

import {AuthService} from '@dbsdecks/app/infrastructure/services/auth.service';


@Component({
  selector: 'register-new-user-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent{
  credentials = {
    firstName : '',
    lastName : '',
    userName : '',
    password : '',
    password_confirmation : '',
    emailAddress : '',
    emailAddress_confirmation : ''
  }
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async submitRegistration(){
    try{
      this.authService.registerNew(this.credentials);
    }catch(err){
      console.log(err.error.errors)
    }
  }

}
