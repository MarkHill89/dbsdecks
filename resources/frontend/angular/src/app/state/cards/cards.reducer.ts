import { Card, LeaderCard } from "../../api/card/card.model";
import { createReducer, on } from '@ngrx/store';
import { loadCards, loadCardsFailure, loadCardsSuccess, loadLeaderCards, loadLeaderCardsFailure, loadLeaderCardsSuccess } from "./cards.action";
import { _initialStateFactory } from "@ngrx/store/src/store_config";

export interface LeaderCardState {
    leaderCards: LeaderCard[];
    error: string;
    status: 'error' | 'loading' | 'loaded' | 'idle';
}

export const initialLeaderCardState : LeaderCardState = {
    leaderCards: [] as LeaderCard[],
    error: '',
    status: 'idle'
}

export interface CardState {
    cards: Card[];
    error: string;
    status: 'error' | 'loading' | 'loaded' | 'idle';
}

export const initialCardState : CardState = {
    cards : [] as Card[],
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

export const cardReducer = createReducer(
    initialCardState,
    on(loadCards, (_state) => ({
        ..._state,
        status: 'loading'
    })),
    on(loadCardsSuccess, (_state, {cards}) => ({
        cards,
        status: 'loaded',
        error: ''
    })),
    on(loadCardsFailure, (_state, {error}) => ({
        cards: [] as Card[],
        status: 'error',
        error
    }))
)