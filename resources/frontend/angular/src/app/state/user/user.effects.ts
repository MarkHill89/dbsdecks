import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserService } from '../../api/user/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess, logout, LogoutFailure, logoutSuccess, verifyToken, verifyTokenSuccess, vertifyTokenFailure } from "./user.actions";
import { catchError, exhaustMap, map, of, tap} from "rxjs";

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private userService: UserService
    ) {}

    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(login),
            exhaustMap((action) => 
                this.userService.login({
                    username: action.username,
                    password: action.password
                }).pipe(
                    map(token => loginSuccess({token})),
                    catchError(error => of(loginFailure({error: error.error.message})))
                )
            )
        )
    )

    check$ = createEffect(() => 
        this.actions$.pipe(
            ofType(verifyToken),
            exhaustMap(() =>
                this.userService.check().pipe(
                    map(({user, token}) => verifyTokenSuccess({user, token})),
                    catchError(error => of(vertifyTokenFailure()))
                )
            )
        )
    )

    logout$ = createEffect(() => 
       this.actions$.pipe(
        ofType(logout),
        exhaustMap(() => 
            this.userService.logout().pipe(
                map(data => {
                    localStorage.clear()
                    return logoutSuccess()
                }),
                catchError(error => of(LogoutFailure()))
            )
        )
       )
    )
}