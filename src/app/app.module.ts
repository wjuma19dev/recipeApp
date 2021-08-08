import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { NgModule } from '@angular/core';
import { RecipeModule } from './recipes/recipe.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { DropdownDirective } from './shared/dropdown.directive';

import { AuthInterceptorService } from './auth/auth.interceptor';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { StorageDataService } from './shared/storage-data.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AuthComponent } from './auth/auth.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipeModule,
    ShoppingListModule
  ],
  providers: [
    RecipeService, 
    ShoppingListService, 
    StorageDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent
  ]
})
export class AppModule { }
