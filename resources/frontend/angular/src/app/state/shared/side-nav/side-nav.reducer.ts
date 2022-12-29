import { createReducer, on } from '@ngrx/store';
import { closeSideNav, openSideNav } from './side-nav.actions';
export interface SideNavState {
    open: boolean;
}

export const initialSideNavState = {
    open: false
}

export const sideNavReducer = createReducer(
    initialSideNavState,
    on(openSideNav, (_state, {open}) => ({
        ..._state,
        open : open
    })),
    on(closeSideNav, (_state, {open}) => ({
        ..._state,
        open : open
    }))
)