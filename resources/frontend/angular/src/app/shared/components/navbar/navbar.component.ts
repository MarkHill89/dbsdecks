import { Component, OnInit, Injectable } from '@angular/core';
import {Event,NavigationCancel,NavigationEnd,NavigationError,NavigationStart,Router} from '@angular/router';
import { NavbarService } from '@dbsdecks/app/infrastructure/services/';
import {LoginComponent} from '@dbsdecks/app/shared/modals/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  show:boolean =  false;
  loading = false;
 
  constructor(
    private router: Router,
    private navbarService: NavbarService
  ) {
  
   }

  ngOnInit() {
  
  }

  open() {
    // this.modalService.open(LoginComponent);
  }

}
