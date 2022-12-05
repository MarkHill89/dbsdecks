import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject, Observable, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { login } from '../../state/user/user.actions';
import { AppState } from '@dbsdecks/app/state/app.state';
import { selectActiveUser } from '../../state/user/user.selectors';
import { UserState } from '../../state/user/user.reducer';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  title = "Login";
  
  loginForm!: FormGroup;

  onDestroy$ = new Subject();

  userStatus$: Observable<UserState> = this.store.select(selectActiveUser);

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    })

    this.userStatus$.pipe(takeUntil(this.onDestroy$)).subscribe(state => {
      if(state.status === 'authenticated') {
        console.log(state);
        localStorage.setItem('token', state.token)
        this.router.navigate([''])
      }
    })
  }

  login() {
    this.store.dispatch(login(this.loginForm.value))
  }

  ngOnDestroy(): void {
      this.onDestroy$.next(true);
      this.onDestroy$.complete();
  }

}
