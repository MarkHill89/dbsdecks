import { Component, OnInit } from '@angular/core';
import {AuthService} from "@dbsdecks/app/infrastructure/services/";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  isAuthenticated = false;
  show:boolean =  false;
  loading = false;
 
  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
  
  }
  checkAuth(){
    this.authService.check().subscribe(res =>{
      console.log(res);
    });
  }


  logout(){
    this.authService.logout().subscribe(res=>{
      localStorage.removeItem('token');
      console.log(res);
    })
        
  }
}
