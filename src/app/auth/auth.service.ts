import { Router } from '@angular/router';
import { AuthResponseData, loadedUser } from './auth.interface';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

const SIGNUP_URL = `${environment.signUpUrl}?key=${environment.apiKey}`;
const SIGNIN_URL = `${environment.signIngUrl}?key=${environment.apiKey}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = new BehaviorSubject<User>(null);
  private _tokenExpirationTimer: any;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {}

  createUserWithEmailAndPassword({ email, password }: {email: string; password: string}) {
    return this._http.post<AuthResponseData>(SIGNUP_URL, { email, password, returnSecureToken: true})
      .pipe(
        catchError(this.handlerError),
        tap(responseData => {
          this.handleAuthentication(
            responseData.email, 
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          )
        })
      );
  }

  signInWithPassword({ email, password }: {email: string; password: string}) {
    return this._http.post<AuthResponseData>(SIGNIN_URL, { email, password, returnSecureToken: true})
      .pipe(
        catchError(this.handlerError),
        tap(responseData => {
          this.handleAuthentication(
            responseData.email, 
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          )
        })
      );
  }

  autoLogin() {

    // 1st Extract userData from localStorage
    const userStorage: loadedUser = JSON.parse(localStorage.getItem('userStorage'));

    // 2nd userData validation, in case that not have data, user is no auth and return
    if(!userStorage) {
      return;
    }

    // 3th If userData exist create new user with User model
    const loadedUser = new User(
      userStorage.email,
      userStorage.id,
      userStorage._token,
      new Date(userStorage._tokenExpirationDate)
    )

    // 4th call next function of user to parse event of new user loaded
    this.user.next(loadedUser);
    const expirationDuration = new Date(userStorage._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration)

  }

  autoLogout(expirationDuration) {

    console.log({ expirationDuration });

    // 1st crear un timer al que se puede acceder desde cualquier parte del servicio
    this._tokenExpirationTimer = setTimeout(expirationTimer => {
      this.logout();
    }, expirationDuration); // You can tests here put 2000 instead expirationDuration

    // 2nd Call this method in handleAuthentication and autoLogin just after of this.user.next(user);

    // * in handleAuthentication the argument is (expireIn * 1000)
    // * in autoLogin is const expirationDuration = new Date(userStorage._tokenExpirationDate).getTime() - new Date().getTime()

  }

  logout() {
    this.user.next(null);
    this._router.navigate(['/auth']);
    localStorage.removeItem('userStorage');
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expireIn: number) {
    const tokenExpirationDate = new Date(new Date().getTime() + expireIn * 1000);
    const user = new User(
      email, 
      localId, 
      idToken, 
      tokenExpirationDate
    );
    this.user.next(user);
    this.autoLogout(expireIn * 1000);
    localStorage.setItem('userStorage', JSON.stringify(user));
  }

  private handlerError(errorResponse: HttpErrorResponse) {

    let errorMessage = 'An unknown error occurred!';

    if(!errorResponse.error || !errorResponse.error.error) {
      throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'La dirección de correo electrónico ya está siendo utilizada';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'El inicio de sesión con contraseña está inhabilitado';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Vuelve a intentarlo más tarde';
        break;
      case 'EMAIL_NOT_FOUND': 
        errorMessage = 'El correo electrónico o la contraseña es incorrecta';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'El correo electrónico o la contraseña es incorrecta';
        break;
      case 'USER_DISABLED':
        errorMessage = 'La cuenta de usuario ha sido inhabilitada por un administrador'
        break;
      default:
        errorMessage = 'An unknown error occurred!';
        break
    }

    return throwError(errorMessage);
  }

  
}
