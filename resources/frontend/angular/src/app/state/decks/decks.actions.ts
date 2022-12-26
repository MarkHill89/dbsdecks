import { createAction, props } from '@ngrx/store';
import { Deck } from '../../api/decks/decks.model';
import { LeaderCard } from 'src/app/api/card/card.model';

export const loadDecks = createAction("[Decks] Loading Decks from Server")

export const onLoadDecksSuccess = createAction(
    '[Decks] Decks Successfully Loaded',
    props<{decks: Deck[]}>()
)

export const onLoadDecksFailure = createAction(
    "[Decks] Decks Failed to Load",
    props<{error: string}>()
)

export const selectDeckLeader = createAction(
    "[Decks - Create/Edit] Leader was selected",
    props<{leader: LeaderCard}>()
)

export const createDeck = createAction(
    "[Decks API] Create new deck",
    props<{leaderNumber: string, title: string}>()
)

export const createDeckSuccess = createAction(
    "[Decks API] Create deck Succeeded",
    props<{
        id: string,
        userId: number,
        title: string, 
        submitDate: string,
        isActive: number,
        isPrivate: number,
        leaderNumber: string
    }>()
)

export const createDeckFailure = createAction(
    "[Decks API] Create deck Failed",
    props<{error: string}>()
)