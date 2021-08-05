import { Router } from '@angular/router';
import { AuthResponseData } from './auth.interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [
  ]
})
export class AuthComponent implements OnInit {

  public isRegisterActive: boolean = false;
  public isLoading: boolean = false;
  public error: string = null;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {}

  onSwitchAuthMode() {
    this.isRegisterActive = !this.isRegisterActive;
  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    let authObs: Observable<AuthResponseData>

    const user: {email: string; password: string} = {
      email: form.value['email'],
      password: form.value['password']
    }

    if (this.isRegisterActive) {
      authObs =this._authService.createUserWithEmailAndPassword(user)
    } else {
      authObs = this._authService.signInWithPassword(user)
    }

    authObs.subscribe(responseData => {
      this.isLoading = false;
      console.log(responseData); // { displayName, email, expiresIn, idToken, kind, localId, refreshToken ,registered }
      this._router.navigate(['/recipes']);
    }, errorMessage => {
      this.isLoading = false;
      console.log(errorMessage);
      this.error = errorMessage;
    });

    form.reset();

  }

}
