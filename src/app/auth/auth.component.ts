import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Router } from '@angular/router';
import { AuthResponseData } from './auth.interface';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [
  ]
})
export class AuthComponent implements OnInit, OnDestroy {

  public isRegisterActive: boolean = false;
  public isLoading: boolean = false;
  public error: string = null;
  closeSub: Subscription;

  // Dynamic Component reference at the DOM ngElement with appPlaceholder directive
  // Do reference to ngTemplate attribute directive appPlaceholder
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
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
      this._router.navigate(['/recipes']);
    }, errorMessage => {
      this.isLoading = false;
      // this.error = errorMessage;
      this.onShowError(errorMessage);
    });

    form.reset();

  }


  // To Create Dynamic Components In Angular
  onShowError(message: string) {

    const alertComponent = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;

    // Clear all component that exist in the view container 
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponent);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    }); 

  }

  handlerErrorAlert() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
