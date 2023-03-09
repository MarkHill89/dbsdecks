import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { CardService } from '../../api/card/card.service';
import { loadCards, loadCardsFailure, loadCardsSuccess, loadLeaderCards, loadLeaderCardsFailure, loadLeaderCardsSuccess } from "./cards.action";
import { mergeMap, withLatestFrom, of } from 'rxjs';
import { checkCards, checkLeaderCards, selectCards, selectLeaderCards } from "./cards.selector";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class CardEffects {
    constructor(
        private actions$ : Actions,
        private store: Store<AppState>,
        private service: CardService
    ) {}

    leaderCards$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadLeaderCards),
            withLatestFrom(this.store.select(checkLeaderCards)),
            mergeMap(([action, {leaderCards}]) => {
                if(!leaderCards.length) {
                    return this.service.getLeaderCards().pipe(
                        map(leaderCards => loadLeaderCardsSuccess({leaderCards})),
                        catchError(error => of(loadLeaderCardsFailure({error: error.error.message})))
                    )
                }
                return of()
            })
        )
    )

    cards$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadCards),
            withLatestFrom(this.store.select(checkCards)),
            mergeMap(([action, {cards}]) => {
                if(!cards.length) {
                    return this.service.getCards().pipe(
                        map(cards => loadCardsSuccess({cards})),
                        catchError(error => of(loadCardsFailure({ error: error.error.message})))
                    )
                }
                return of()
            })
        )
    )
}