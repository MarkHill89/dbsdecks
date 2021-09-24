import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from "@angular/router";
import { Observable, EMPTY, of, throwError } from "rxjs";
import { DeckService } from "src/app/services/deck.service";
import { map, catchError } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { Deck } from "../models/deck.model";

@Injectable()
export class EditDeckResolverService implements Resolve<any> {
    constructor(
        private deckService: DeckService, 
        private router: Router,
        private authService: AuthService
    ) {

    }

    resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> | any {
        if(next.queryParams.action === "edit" && next.queryParams.id) {
            let token = this.authService.getTokenData();
            return this.deckService.findDeck(next.queryParams.id).pipe(
                map((data: Deck) => {
                    if(parseInt(token.id) === data.userId) {
                        return data;    
                    }
                    throwError("Invalid deck data");
                }), 
                catchError( (error) => {
                    let nagivationExtras: NavigationExtras = {
                        queryParams: {errors: true}
                    }
                    this.router.navigate([`/deck/view/${next.queryParams.id}`], nagivationExtras);
                    return of({error : error})
                })
            );
        }
        return {};
    }
}