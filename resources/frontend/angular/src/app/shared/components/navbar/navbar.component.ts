import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { map, filter  } from 'rxjs/operators';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { NavbarService } from '../../../services/navbar.service';

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

}
