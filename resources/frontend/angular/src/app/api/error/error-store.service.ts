import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorType } from './error.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorStoreService {

  private readonly _errorMessage = new BehaviorSubject<string>('')
  readonly errorMessage$ = this._errorMessage.asObservable();

  private readonly _errorType = new BehaviorSubject<ErrorType| null>(null)
  readonly errorType$ = this._errorType.asObservable();

  constructor() { }

  get errorMessage() {
    return this._errorMessage.getValue()
  }

  set errorMessage(error) {
    this._errorMessage.next(error);
  }

  get errorType() {
    return this._errorType.getValue();
  }

  set errorType(error) {
    this._errorType.next(error);
  }

  unset() {
    this._errorType.next(null);
    this._errorMessage.next('');
  }
}
