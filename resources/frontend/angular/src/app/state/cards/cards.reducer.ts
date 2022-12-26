import { Card, LeaderCard } from "../../api/card/card.model";
import { createReducer, on } from '@ngrx/store';
import { loadLeaderCards, loadLeaderCardsFailure, loadLeaderCardsSuccess } from "./cards.action";
import { _initialStateFactory } from "@ngrx/store/src/store_config";

export interface LeaderCardState {
    leaderCards: LeaderCard[];
    error: string;
    status: 'error' | 'loading' | 'loading' | 'idle';
}

export const initialLeaderCardState : LeaderCardState = {
    leaderCards: [] as LeaderCard[],
    error: '',
    status: 'idle'
}

export const leaderCardReducer = createReducer(
    initialLeaderCardState,
    on(loadLeaderCards, (_state) => ({
        ..._state,
        status: 'loading'
    })),
    on(loadLeaderCardsSuccess, (_state, {leaderCards}) => ({
        leaderCards: leaderCards,
        status: 'loading',
        error: ''
    })),
    on(loadLeaderCardsFailure, (_state, {error}) => ({
        leaderCards: [] as LeaderCard[],
        status: 'error',
        error: error
    }))
)