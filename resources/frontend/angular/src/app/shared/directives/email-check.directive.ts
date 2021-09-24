import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../infrastructure/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[emailCheck]',
  providers: [
    {provide: NG_ASYNC_VALIDATORS, useExisting: EmailCheckDirective, multi: true}
  ]
})
export class EmailCheckDirective implements AsyncValidator{

  constructor(
    private authService: AuthService, 
  ) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.authService.isEmailTaken(control.value).pipe(
      map((isUsed : any) => {
        return isUsed.message === "OK" ? null : { emailCheck : "This email already has an account registered to it"}
      })
    )
  }

}
