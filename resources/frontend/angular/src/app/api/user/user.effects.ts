import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "../app.state";
import { Store, Action } from "@ngrx/store";
import { UserService } from './user.service';
import { authenticateUser, authenticateUserError, authenticateUserSuccess } from "./user.actions";
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';

@Injectable()
export class UserEffects {
    constructor(
        private actions$ : Actions,
        private store : Store<AppState>,
        private userService : UserService
    ) { }

    authenticateUser$ = createEffect(() : Observable<Action> => 
        this.actions$.pipe(
            ofType(authenticateUser),
            switchMap((action) => 
                from(this.userService.login(action)).pipe(
                    map((data) => authenticateUserSuccess({token : data.token}),
                    catchError((error) => of(authenticateUserError({ error }))))
                )
            )
        )
    )
}