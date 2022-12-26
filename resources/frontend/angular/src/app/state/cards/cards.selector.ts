import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { LeaderCard } from '../../api/card/card.model';
export const leaderCards = (state: AppState) => state.leaderCards;

export const selectLeaderCards = (filters = {}) => createSelector(leaderCards, (state) => 
    state.leaderCards.filter((i: LeaderCard) => 
        Object.entries(filters).every(([k, v]: any) => i[k].toLowerCase().indexOf(v.toLowerCase()) > -1 ))
)