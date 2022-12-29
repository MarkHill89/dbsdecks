import { createAction, props } from '@ngrx/store';
import { LeaderCard } from '../../api/card/card.model';

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