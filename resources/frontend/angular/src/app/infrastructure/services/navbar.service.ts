import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NavbarService {

  private _heading: BehaviorSubject<string> = new BehaviorSubject<string>('home');
  heading$ = this._heading.asObservable();

  constructor() { }

  
}
