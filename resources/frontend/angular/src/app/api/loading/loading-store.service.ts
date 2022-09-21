import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingStatus } from './loading.model';

@Injectable({
  providedIn: 'root'
})
export class LoadingStoreService {

  private readonly _loading = new BehaviorSubject<LoadingStatus>(LoadingStatus.IDLE);
  readonly loading$ = this._loading.asObservable();

  constructor() { }

  set loading(loading) {
    this._loading.next(loading);
  }

  get loading() {
    return this._loading.getValue();
  }
}
