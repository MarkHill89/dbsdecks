import { createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectActiveUser = (state: UserState) => state.user;