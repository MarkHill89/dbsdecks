import { Component, OnInit } from '@angular/core';
import { UserStoreService } from './api/user/user-store.service';
import { UserService } from './api/user/user.service';
import { LoadingStatus } from './api/loading/loading.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  authenticated$ = this.userStore.authenticated$;

  title = 'DBS Decks';
  navbarCollapse = true;
  profileCollapse = true;
  today: number = Date.now();

  constructor(
    private userService: UserService,
    private userStore: UserStoreService
  ) {

  }

  get loadingStatus() {
    return LoadingStatus;
  }

  ngOnInit(): void {
      this.userService.check().pipe().subscribe();
      this.userService.getUser().pipe().subscribe();
  }

  logout() {
    
    this.userService.logout().pipe().subscribe((res) => {
      this.navbarCollapse = true;
      this.profileCollapse = true;
    });
  }
}
