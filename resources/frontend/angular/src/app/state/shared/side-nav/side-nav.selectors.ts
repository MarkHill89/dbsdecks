import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';
import { SideNavState } from './side-nav.reducer';

export const selectSideNav = (state: AppState) => state.sideNav;

export const selectSideNavState = createSelector(
    selectSideNav,
    (state: SideNavState) => state
)