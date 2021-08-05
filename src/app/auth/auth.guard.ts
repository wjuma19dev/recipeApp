import { Observable } from 'rxjs';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this._authService.user.pipe(
            map(user => {
                
                const isAuth = !!user;
                
                if (isAuth) {
                    return true;
                }

                return this._router.createUrlTree(['/auth'])
            })
        );
    }

}