import { User } from './user.model';
import { createReducer, on } from '@ngrx/store';
import { authenticateUser, authenticateUserSuccess } from './user.actions';

export interface UserState {
    user : User;
    token: string;
    error: string | null;
    status: 'authenticated' | 'loading' | 'error' | 'unauthenicated'
}

export const initialState : UserState = {
    user: {} as User,
    token: '',
    error: null,
    status: 'unauthenicated'
}

export const userReducer = createReducer(
    initialState,
    on(authenticateUser, (state) => ({
        ...state,
        status: 'loading'
    })),
    on(authenticateUserSuccess, ( state, { token }) => ({
        ...state,
        token: token,
        error: null,
        status: 'authenticated'
    }))
)