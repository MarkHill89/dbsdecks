import { Component, OnInit } from '@angular/core';
import {AuthService} from "@dbsdecks/app/infrastructure/services/";
import { Router, NavigationEnd, RouterEvent, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  authenticated = false;
  show:boolean =  false;
  loading = false;
  user:any;
  isMenuCollapsed = true;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isAuthenticated.subscribe(res => {
      this.checkAuth()
    })
    this.router.events.pipe(filter((evt: any) =>evt instanceof NavigationStart))
    .subscribe((event: NavigationStart) => {
      this.isMenuCollapsed = true;
    })
  }

  checkAuth(){
    this.authService.check().subscribe(res =>{
      if(res ==1){
        this.authenticated = true;
        this.getCurrentUser();
      } else{
        this.authenticated = false;
      }
    });
  }


  logout(){
    this.authService.logout().subscribe(res=>{
      localStorage.removeItem('token');
      this.authService.isAuthenticated.next(false);
      this.authenticated = false;
    })
        
  }
  getCurrentUser(){
    this.authService.getUser().subscribe(res =>{
      this.user = res;
    })
  }
}
