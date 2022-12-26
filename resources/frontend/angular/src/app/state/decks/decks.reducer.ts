import { Deck } from 'src/app/api/decks/decks.model';
import { createReducer, on } from '@ngrx/store';
import { createDeck, createDeckFailure, createDeckSuccess, loadDecks, onLoadDecksSuccess } from './decks.actions';
import { Card } from '../../api/card/card.model';

export interface DeckState {
    decks:Deck[]
    error: string;
    status: "loading" | "loaded"
}

export const initialDeckState: DeckState  = {
    decks: [],
    error: '',
    status: "loaded" 
}

export const decksReducer = createReducer(
    initialDeckState,
    on(loadDecks, (_state) => ({
        ..._state,
        status: "loading"
    })),
    on(onLoadDecksSuccess, (_state, { decks }) => ({
        decks: decks,
        status: "loaded",
        error: ''
    }))
)

export interface DeckListState {
    id: string | number,
    userId: string | number,
    title: string,
    leaderNumber: string,
    leader: Card,
    mainDeck: Card[],
    zDeck: Card[],
    sideDeck: Card[],
    isPrivate: boolean | number,
    isActive: boolean | number,
    submitDate: string,
    error: string,
    status: 'loading' | 'loaded' | 'error'
}

export const initialDeckListState: DeckListState = {
    id: 0,
    userId: 0,
    title: '',
    leaderNumber: '',
    leader : {} as Card,
    mainDeck: [] as Card[],
    zDeck: [] as Card[],
    sideDeck: [] as Card[],
    isPrivate: false,
    isActive: true,
    submitDate: '',
    error: '',
    status: 'loaded'
}

export const deckListReducer = createReducer(
    initialDeckListState,
    on(createDeck, (_state, { leaderNumber, title}) => ({
        ..._state,
        leaderNumber : leaderNumber,
        title : title,
        status: 'loading'
    })),
    on(createDeckSuccess, (_state, {
        id,
        userId,
        title,
        submitDate,
        isActive,
        isPrivate,
        leaderNumber
    }) => ({
        ..._state,
        id,
        userId,
        title,
        submitDate,
        isActive, 
        isPrivate,
        leaderNumber,
        status: 'loaded',
        error: ''
    })),
    on(createDeckFailure, (_state, { error }) => ({
        ..._state,
        status: 'error',
        error
    }))
)