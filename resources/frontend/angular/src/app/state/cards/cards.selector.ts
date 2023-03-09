import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { Card, LeaderCard } from '../../api/card/card.model';
import { CardState, LeaderCardState } from './cards.reducer';

export const leaderCards = (state: AppState) => state.leaderCards;

export const cards = (state: AppState) => state.cards;

export const checkLeaderCards = createSelector(
    leaderCards,
    (state: LeaderCardState) => state
)

export const checkCards = createSelector(
    cards, 
    (state: CardState) => state
)

export const selectLeaderCards = (filters = {}) => createSelector(leaderCards, (state) => 
    state.leaderCards.filter((i: LeaderCard) => 
        Object.entries(filters).every(([k, v]: any) => i[k].toLowerCase().indexOf(v.toLowerCase()) > -1 ))
)

export const selectCards = (filters = {}) => createSelector(cards, (state) => 
    state.cards.filter((i : Card) => 
        Object.entries(filters).every(([k, v]: any)  => i[k].toLowerCase().indexOf(v.toLowerCase()) > -1))    
)