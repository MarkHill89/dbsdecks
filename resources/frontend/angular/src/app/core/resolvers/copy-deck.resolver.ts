import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from "@angular/router";
import { Observable, EMPTY, of } from "rxjs";
import { DeckService } from "src/app/services/deck.service";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class CopyDeckResolverService implements Resolve<any> {
    constructor(private deckService: DeckService, private router: Router) {

    }

    resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> | any {
        if(next.queryParams.action === "copy" && next.queryParams.id) {
            return this.deckService.findDeck(next.queryParams.id).pipe(
                map((data) => data), 
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