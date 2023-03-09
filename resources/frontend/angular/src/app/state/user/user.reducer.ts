import { createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess, logout, LogoutFailure, logoutSuccess, verifyToken, verifyTokenSuccess, vertifyTokenFailure } from './user.actions';
import { User } from '../../api/user/user.model';

export interface UserState {
    user: User;
    error: string;
    token: string;
    status: 'authenticated' | 'loading' | 'error' | 'unauthenticated';
}

export const initialUserState = {
    user : {} as User,
    token: '',
    error: '',
    status: 'unauthenicated'
}

export const userReducer = createReducer(
    initialUserState,
    on(login, (_state,  { username }) => ({
      ..._state,
      user: {..._state.user, username},
      status: 'loading'
    })),
    on(loginSuccess, (_state, { token } ) => ({
        ..._state, 
        token,
        status: 'authenticated'
    })),
    on(loginFailure, (_state, { error }) => ({
        ..._state,
        error: error,
        token: '',
        status: 'error'
    })),
    on(verifyToken, (_state) => ({
        ..._state,
        status: 'loading'
    })),
    on(verifyTokenSuccess, (_state, {user, token}) => ({
        user: user,
        token: token,
        status: 'authenticated',
        error: ''
    })),
    on(vertifyTokenFailure, (_state) => ({
        ..._state,
        token: '',
        status: 'unauthenticated'
    })),
    on(logout, (_state) => ({
        ..._state,
        status: 'loading'
    })),
    on(logoutSuccess, (_state) => ({
        ..._state,
        status: 'unauthenticated',
        error: '',
        token: '',
        user: {} as User
    })),
    on(LogoutFailure, (_state) => ({
        ..._state
    }))
)