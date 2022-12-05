import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[Login Page] Login',
    props<{ username: string; password: string}>()
)

export const loginSuccess = createAction(
    '[Login API] Login Success',
    props<{token: string}>()
)

export const loginFailure = createAction(
    '[Login API] Login Failure',
    props<{ error: string}>()
)

export const verifyToken = createAction('[Login API] Verify Token')

export const verifyTokenSuccess = createAction('[Login API] Verify Token Success')

export const vertifyTokenFailure = createAction('[Login API] Verify Token Failure')

export const logout = createAction('[Logout] Logout')

export const logoutSuccess = createAction('[Logout] Logout Success')

export const LogoutFailure  = createAction('[Logout] Logout Failure')