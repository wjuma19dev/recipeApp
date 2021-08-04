import { AuthResponseData } from './auth.interface';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';

const SIGNUP_URL = `${environment.signUpUrl}?key=${environment.apiKey}`;
const SIGNIN_URL = `${environment.signIngUrl}?key=${environment.apiKey}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Subject<User> = new Subject();

  constructor(private _http: HttpClient) {}

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

  private handleAuthentication(email: string, localId: string, idToken: string, expireIn: number) {
    const tokenExpirationDate = new Date(new Date().getTime() + expireIn * 1000);
    const user = new User(
      email, 
      localId, 
      idToken, 
      tokenExpirationDate
    );
    this.user.next(user);
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
