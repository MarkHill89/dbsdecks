import { Injectable } from "@angular/core";
import { DecksService } from "@dbsdecks/app/api/decks/decks.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { loadDecks, onLoadDecksFailure, onLoadDecksSuccess } from "./decks.actions";
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class DecksEffects {
    constructor(
        private actions$ : Actions,
        private store: Store<AppState>,
        private service: DecksService
    ) {}

    allDecks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadDecks),
            exhaustMap(() => 
                this.service.getDecks()
                .pipe(
                    map(decks => onLoadDecksSuccess({decks})),
                    catchError(error => of(onLoadDecksFailure({error: error.error.message})))
                )
            )
        )
    )
}