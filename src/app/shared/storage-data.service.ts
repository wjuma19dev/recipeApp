import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Environments vars
const API_URL = `${environment.apiUrl}/recipes.json`;


@Injectable()
export class StorageDataService {

    constructor(
        private _http: HttpClient,
        private _recipeService: RecipeService,
        private _authService: AuthService
    ) {}

    public storageRecipesData() {

        const recipes = this._recipeService.fetchAll;

        this._http.put(API_URL, recipes).subscribe(response => {
            console.log(response);
        });

    }

    public fetchStorageData(): Observable<Recipe[]> {

        // WITH LOGIN FEATURES
        // take         -> Take only the first value that emit the observable and cancel the subscription
        // exhaustMap   -> get the data after take has the value taking 

        // return this._authService.user
        //     .pipe(
        //         take(1),
        //         exhaustMap(user => {
        //             return this._http.get<Recipe[]>(API_URL, { params: new HttpParams().set('auth', user.token) });
        //         }),
        //         map(recipes => {
        //             // Return new Array if Not has ingredients setting that equal []
        //             return recipes.map(recipe => {
        //                 return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        //             });
        //         }),
        //         tap(recipes => {
        //             this._recipeService.setRecipes(recipes);
        //         }) 
        //     );
        
            
    
        // THIS IS WITHOUT LOGIN FEATURES
        return this._http.get<Recipe[]>(API_URL)
            .pipe(
                map(recipes => {
                    // Return new Array if Not has ingredients setting that equal []
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                    });
                }),
                tap(recipes => {
                    this._recipeService.setRecipes(recipes);
                })
            )

    }
}