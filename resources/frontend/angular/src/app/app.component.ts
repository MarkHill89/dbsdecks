import { Component, OnInit } from '@angular/core';
import { UserStoreService } from './api/user/user-store.service';
import { Subject } from 'rxjs';
import { UserService } from './api/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  authenticated$ = this.userStore.authenticated$;

  title = 'DBS Decks';
  navbarCollapse = true;
  today: number = Date.now();

  constructor(
    private userService: UserService,
    private userStore: UserStoreService
  ) {

  }

  ngOnInit(): void {
      this.userService.check().pipe().subscribe();
      this.userService.getUser().pipe().subscribe();
  }

}
