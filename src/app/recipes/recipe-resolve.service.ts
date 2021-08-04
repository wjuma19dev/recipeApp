import { RecipeService } from './recipe.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { StorageDataService } from './../shared/storage-data.service';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeResolveService implements Resolve<Recipe[]> {

    constructor(
        private _storageDataService: StorageDataService,
        private _recipeService: RecipeService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // SEGUN MAZ ESTE CODIGO ES PARA EVITAR ERRORES ERAROS PERO NO ME FUNCIONA
        const recipes = this._recipeService.fetchAll;

        if(recipes.length === 0) {
            return this._storageDataService.fetchStorageData();
        } else {
            return recipes;
        }

        // return this._storageDataService.fetchStorageData();

    }

}