import { createAction, props } from '@ngrx/store';

export const openSideNav = createAction(
    "[Side Nav] Opening Side Nav",
    props<{open: boolean}>()
)

export const closeSideNav = createAction(
    "[Side Nav] Opening Side Nav",
    props<{open: boolean}>()
)