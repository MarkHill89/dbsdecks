import { createAction, props } from '@ngrx/store';
import { Deck } from '../../api/decks/decks.model';

export const loadDecks = createAction("[Decks] Loading Decks from Server")

export const onLoadDecksSuccess = createAction(
    '[Decks] Decks Successfully Loaded',
    props<{decks: Deck[]}>()
)

export const onLoadDecksFailure = createAction(
    "[Decks] Decks Failed to Load",
    props<{error: string}>()
)