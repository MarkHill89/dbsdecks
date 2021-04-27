import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import {AuthService} from "@dbsdecks/app/infrastructure/services/";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username="";
  password = "";

  constructor(
    private authService: AuthService,
  ) { }
  

  submitLogin(){
    this.authService.login(this.username, this.password).subscribe(res =>{
      localStorage.setItem('token', res);
      if(res){
        console.log("logged in");
      }
        
    });
    
  }

}
