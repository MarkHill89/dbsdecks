import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-login-register',
  templateUrl: './user-login-register.component.html',
  styleUrls: ['./user-login-register.component.scss']
})
export class UserLoginRegisterComponent implements OnInit {

  loginVisible$ = new BehaviorSubject<boolean>(true);

  constructor(
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
  }

  onSelectLoginTab($event: any) {
    this.loginVisible$.next(true);
  }

  onSelectRegisterTab($event: any) {
    this.loginVisible$.next(false);
  }

  login() {

  }

  register() {
    
  }
}
