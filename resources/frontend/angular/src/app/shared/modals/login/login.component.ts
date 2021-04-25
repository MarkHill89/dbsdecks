import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') username? : ElementRef;
  password = "";
  constructor() { }

  ngOnInit(){
   
  }

  submitLogin(){
    console.log(this.username?.nativeElement.value);
  }

}
