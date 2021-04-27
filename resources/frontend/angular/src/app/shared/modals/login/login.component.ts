import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from "@dbsdecks/app/infrastructure/services/";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  
  get f() { return this.form.controls; }

  submitLogin(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    
    this.loading = true;
    console.log([this.f.username, this.f.password.value]);
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(res =>{
      localStorage.setItem('token', res);
      if(res){
        console.log("logged in");
      }
        
    });
    
  }

}
