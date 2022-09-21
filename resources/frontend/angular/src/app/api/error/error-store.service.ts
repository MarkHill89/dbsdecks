import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorStoreService {

  private readonly _errorMessage = new BehaviorSubject<string>('')
  readonly errorMessage$ = this._errorMessage.asObservable();

  constructor() { }

  get errorMessage() {
    return this._errorMessage.getValue()
  }

  set errorMessage(error) {
    this._errorMessage.next(error);
  }
}
