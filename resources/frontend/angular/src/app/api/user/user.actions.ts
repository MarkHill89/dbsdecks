import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const checkUser = createAction(
    "[User] Authenticate User",
    props<{ token: string }>()
)

export const unauthenticateUser = createAction(
    "[User] Unauthenticate User",
    props<{ token: string}>()
)

export const authenticateUser = createAction(
    '[User] Logging in user',
    props< { username : String, password: String}>()
)

export const authenticateUserSuccess = createAction(
    "[User API] Login Successful",
    props< { token : string }>()
)

export const authenticateUserError = createAction(
    "[User API] Login Error",
    props< { error : string }>()
)