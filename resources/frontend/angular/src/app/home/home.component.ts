import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


declare let gtag: Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router) { 
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        gtag('config', 'UA-114061835-1', {
            'page_path': event.urlAfterRedirects
        });
      }
    })
  }

  ngOnInit(): void {
    
  }

}