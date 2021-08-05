import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private _authService: AuthService
    ) {}

    intercept( req: HttpRequest<any>, next: HttpHandler ) {

        return this._authService.user
            .pipe(
                take(1),
                exhaustMap(user => {
                    
                    // If do not exist user, send the request with out auth=`${user.token}`;
                    if(!user) {
                        return next.handle(req);
                    }

                    const modifiedRequest = req.clone({
                        params: new HttpParams().set('auth', user.token)
                    });

                    console.log(modifiedRequest.url);
                    return next.handle(modifiedRequest);
                })
            )
    }
} 