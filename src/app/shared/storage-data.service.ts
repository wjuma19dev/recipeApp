import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Environments vars
const API_URL = `${environment.apiUrl}/recipes.json`;


@Injectable()
export class StorageDataService {

    constructor(
        private _http: HttpClient,
        private _recipeService: RecipeService
    ) {}

    public storageRecipesData() {

        const recipes = this._recipeService.fetchAll;

        this._http.put(API_URL, recipes).subscribe(response => {
            console.log(response);
        });

    }

    public fetchStorageData(): Observable<Recipe[]> {
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