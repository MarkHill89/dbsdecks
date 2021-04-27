import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'register-new-user-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  firstName = '';
  lastName = '';
  userName = '';
  password = '';
  confirmPassword = '';
  emailAddress = '';
  confirmEmailAddress= '';
  constructor() { }

  ngOnInit(): void {
  }

}
