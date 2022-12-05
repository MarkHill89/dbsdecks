import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from './state/app.state';
import { logout, verifyToken } from './state/user/user.actions';
import { UserState } from './state/user/user.reducer';
import { selectActiveUser } from './state/user/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'DBS Decks';
  navbarCollapse = true;
  profileCollapse = true;
  today: number = Date.now();

  userState$: Observable<UserState> = this.store.select(selectActiveUser);
  onDestroy$ = new Subject();
  constructor(
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
      this.store.dispatch(verifyToken())
  }

  logout() { 
    this.store.dispatch(logout())
    localStorage.clear();
  }
}
