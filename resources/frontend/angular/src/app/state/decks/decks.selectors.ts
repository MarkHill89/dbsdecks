import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { DeckListState, DeckState } from './decks.reducer';
import { Deck } from '@dbsdecks/app/api/decks/decks.model';

export const selectDecks = (state: AppState) => state.decks;

export const selectAllDecks = createSelector(
    selectDecks,
    (state: DeckState) => state
)

export const  selectDeckList = (state: AppState) => state.deckList;

export const activeDeckList = createSelector(
    selectDeckList,
    (state: DeckListState) => state
)