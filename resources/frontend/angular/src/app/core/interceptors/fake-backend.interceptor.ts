import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInteceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return <any>of(null)
            .pipe(
                mergeMap(() => {
                    switch(true) {
                        case url.endsWith('/create') && method === 'POST' && this.authService.getToken() !== null: 
                        case url.endsWith('/submit') && method === 'POST' && this.authService.getToken() !== null:
                            return next.handle(request);
                        default:
                            return next.handle(request);
                    }
            // if(request.url.endsWith('/events/create') && request.method === 'POST' ) {
            //     if(this.authService.getToken() !== null) {
            //         return next.handle(request);
            //     }else {
            //         return throwError({ status: 401, error: { message: 'Unauthorized'}});
            //     } 
            // }else if (request.url.endsWith('/deck/submit') && request.method === 'POST') {
            //     if(this.authService.getToken() !== null) {
            //         return next.handle(request);
            //     }else {
            //         return throwError({ status: 401, error: { message: 'Unauthorized'}});
            //     }
            // }
            // return next.handle(request);
        }))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}