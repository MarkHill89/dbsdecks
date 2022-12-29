import { Injectable } from "@angular/core";
import { DecksService } from "@dbsdecks/app/api/decks/decks.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { createDeck, createDeckFailure, createDeckSuccess, loadDecks, onLoadDecksFailure, onLoadDecksSuccess } from "./decks.actions";
import { catchError, exhaustMap, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { selectAllDecks } from "./decks.selectors";
import { Router } from '@angular/router';
import { BsModalService } from "ngx-bootstrap/modal";

@Injectable()
export class DecksEffects {
    constructor(
        private actions$ : Actions,
        private store: Store<AppState>,
        private service: DecksService,
        private router: Router,
        private modalService: BsModalService,
    ) {}

    allDecks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadDecks),
            withLatestFrom(this.store.select(selectAllDecks)),
            mergeMap(([action, {decks}]) => {
                if(!decks.length) {
                    return this.service.getDecks().pipe(
                        map(decks => onLoadDecksSuccess({decks})),
                        catchError(error => of(onLoadDecksFailure({error: error.error.message})))
                    )
                }
                return of()
            })
        )
    )

    submitDeck$ = createEffect(() => 
        this.actions$.pipe(
            ofType(createDeck),
            exhaustMap((action) => {
                return this.service.createDeck({
                    title: action.title,
                    leaderNumber : action.leaderNumber
                }).pipe(
                    map((deck) => 
                    createDeckSuccess({...deck})),
                    catchError(error => of(createDeckFailure({error: error.error.message})))
                )
            })
        )
    )

    viewNewDecK$ = createEffect(() => 
        this.actions$.pipe(
            ofType(createDeckSuccess),
            tap((action) => {
                this.modalService.hide();
                this.router.navigateByUrl(`/decks/view/${action.id}`)
            })
        ),
        {dispatch: false}
    )
}