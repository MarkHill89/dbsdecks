import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from "@angular/router";
import { Observable, EMPTY, of } from "rxjs";
import { DeckService } from "src/app/services/deck.service";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class RecentDecksResolverService implements Resolve<any> {
    constructor(private deckService: DeckService) { }

    resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> | any {
        return this.deckService.getDecks().pipe(map((data) => data));
    }
}