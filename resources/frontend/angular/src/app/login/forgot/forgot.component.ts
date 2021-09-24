import { Component, OnInit } from '@angular/core';
import {AuthService} from '@dbsdecks/app/infrastructure/services/auth.service'
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  email = '';
  constructor(
    protected authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  submitForgot(){
    this.authService.forgotPassword(this.email).subscribe(res =>{
      if(res){
        console.log(res);
      }
    });
  }

}
