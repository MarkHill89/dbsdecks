import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { CardService } from '../../api/card/card.service';
import { loadLeaderCards, loadLeaderCardsFailure, loadLeaderCardsSuccess } from "./cards.action";
import { mergeMap, withLatestFrom, of } from 'rxjs';
import { selectLeaderCards } from "./cards.selector";
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
            withLatestFrom(this.store.select(selectLeaderCards)),
            mergeMap(([action, leaderCards]) => {
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
}