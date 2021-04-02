import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // make sure to guard against the null vs string otherwise will fail
    let token = '';
    if(localStorage.getItem('token') !== null) {
      token = localStorage.getItem('token');
    }
    req = req.clone({
      setHeaders: {
        'Authorization': token,
        'X-Token': token,
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Expose-Headers': 'Authorization, X-Token',
        'Content-Type': 'application/json'
      },
    });
    return next.handle(req);
  }
}