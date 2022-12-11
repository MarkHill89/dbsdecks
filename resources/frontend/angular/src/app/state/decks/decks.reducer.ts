import { Deck } from 'src/app/api/decks/decks.model';
import { createReducer, on } from '@ngrx/store';
import { loadDecks, onLoadDecksSuccess } from './decks.actions';

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