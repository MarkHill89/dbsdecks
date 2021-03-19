import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private _heading: BehaviorSubject<string> = new BehaviorSubject<string>('Home');
  heading$ = this._heading.asObservable();

  constructor() { }

  
}
