import { Component, OnInit } from '@angular/core';
import {AuthService} from "@dbsdecks/app/infrastructure/services/";
import { Router, NavigationEnd, RouterEvent, NavigationStart } from '@angular/router';
import { filter, tap, map } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
  authenticated = false;
  show:boolean =  false;
  loading = false;
  user:any;
  isMenuCollapsed = true;
  authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.pipe(filter((evt: any) =>evt instanceof NavigationStart))
    .subscribe((event: NavigationStart) => {
      this.isMenuCollapsed = true;
    })
  }
  ngOnInit() {
    this.subscriptions.add(this.authService.isAuthenticated$.subscribe((authenticated) => {
        if(!this.authenticated$.getValue()) {
          this.checkAuth()
        }else {
          this.authenticated$.next(true);
        }

      }
    ))
  }
  
  checkAuth(){
    this.subscriptions.add(this.authService.check().subscribe(result => {
      this.authService.isAuthenticated$.next(true);
      this.authenticated$.next(true);
      this.getCurrentUser();
    }, error => {
      if(error === "Unauthenticated.") {
        localStorage.removeItem('token');
      }
    }))
  }

  getCurrentUser(){
    this.subscriptions.add(this.authService.getUser().subscribe(user => this.user = user));
  }

  logout(){
    this.authService.logout().subscribe(res=>{
      localStorage.removeItem('token');
      this.authService.isAuthenticated$.next(false);
      this.authenticated$.next(false);
    })
        
  }
  
}
