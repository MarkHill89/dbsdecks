import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from '../user/user.reducer';

export const selectUser = (state: AppState) => state.user;

export const selectActiveUser = createSelector(
    selectUser,
    (state: UserState) => state
)
export const selectUserStatus = createSelector(
    selectUser,
    (state: UserState) => state.status
)