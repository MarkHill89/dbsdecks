import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingStoreService } from '../../api/loading/loading-store.service';
import { UserStoreService } from '../../api/user/user-store.service';
import { UserService } from '../../api/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingStatus } from '../../api/loading/loading.model';
import { ForgotPasswordStatus } from '../../api/user/user.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  forgotPasswordForm: FormGroup = new FormGroup({});

  loading$ = this.loadingStore.loading$.pipe();
  onDestroy$ = new Subject();
  forgotPassword$ = this.userStoreService.forgotPassword$.pipe();
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userStoreService: UserStoreService,
    private loadingStore: LoadingStoreService
  ) { }

  get loadingStatus() {
    return LoadingStatus;
  }

  get forgotPasswordStatus() {
    return ForgotPasswordStatus;
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      emailAddress: new FormControl('')
    });
    this.loading$.pipe(takeUntil(this.onDestroy$)).subscribe();
    this.forgotPassword$.pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  submit() {
    this.userService.forgotPassword(this.forgotPasswordForm.value);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}
