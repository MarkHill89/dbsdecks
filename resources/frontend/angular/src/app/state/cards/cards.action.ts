import { createAction, props } from '@ngrx/store';
import { Card, LeaderCard } from '../../api/card/card.model';

export const loadLeaderCards = createAction(
    '[Card Api] Leader Cards Loading'
)

export const loadLeaderCardsSuccess = createAction(
    '[Card API] Leader Cards loaded successfully',
    props<{leaderCards: LeaderCard[]}>()
)

export const loadLeaderCardsFailure = createAction(
    '[Card API] Leader Cards failed to load',
    props<{error: string}>()
)

export const loadCards = createAction(
    '[Card Api] Cards Loading'
)

export const loadCardsSuccess = createAction(
    '[Card Api] Cards Loaded Successfully',
    props<{cards: Card[]}>()
)

export const loadCardsFailure = createAction(
    '[Card API] Cards failed to load',
    props<{error: string}>()
)

