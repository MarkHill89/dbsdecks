import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingStoreService } from '../../api/loading/loading-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  forgotPasswordForm: FormGroup = new FormGroup({});

  loading$ = this.loadingStore.loading$.pipe();
  onDestroy$ = new Subject();
  
  constructor(
    private formBuilder: FormBuilder,
    private loadingStore: LoadingStoreService
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      emailAddress: new FormControl('')
    });
    this.loading$.pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  submit() {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}
