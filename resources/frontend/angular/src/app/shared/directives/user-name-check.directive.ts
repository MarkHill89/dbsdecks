import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../infrastructure/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[userNameCheck]',
  providers: [
    {provide: NG_ASYNC_VALIDATORS, useExisting: UserNameCheckDirective, multi: true}
  ]
})
export class UserNameCheckDirective implements AsyncValidator {

  constructor(
    private authService: AuthService
  ) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.isUserNameTaken(control.value).pipe(
      map((isUsed : any) => {
        return isUsed.message === "OK" ? null : { userNameCheck : "This username is not available"}
      })
    )
  }
}
