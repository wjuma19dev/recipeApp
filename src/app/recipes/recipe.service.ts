import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', 'Stir Fry Green Beans', 'Stir-fries are fast, easy, and simple, and this classic green bean offering is no different.', 'beans.jpg', [
            {name: '2 (6-oz.) salmon fillets', amount: 35},
            {name: '2 tsp. extra-virgin olive oil', amount: 15}
        ]),
        new Recipe('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'Zucchini Salad', 'It\"s hot and humid and you really don\"t want to cook: just the thought of turning on a burner boils your blood', 'zucchini.jpg', [
            {name: '2 tbsp. whole grain mustard', amount: 89},
            {name: '1 tbsp. packed brown sugar', amount: 15}
        ])
    ];

    public updatedRecipesSub: Subject<Recipe[]> = new Subject();

    public get fetchAll(): Recipe[] {
        return this.recipes.slice();
    }

    public setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.updatedRecipesSub.next([...this.recipes]);
    }

    public getRecipe(recipeId: string): Recipe {
        return {...this.recipes.find(recipe => recipe.id === recipeId)};
    }

    public addRecipe(newRecipe: Recipe): void {
        this.recipes.push(newRecipe);
        this.updatedRecipesSub.next([...this.recipes]);
        console.log(this.recipes);
    }

    public updateRecipe(recipeId: string, newRecipe: Recipe): void {  
        const recipeIndex = this.recipes.findIndex(recipe => recipe.id === recipeId);
        this.recipes[recipeIndex] = newRecipe;
        this.updatedRecipesSub.next([...this.recipes]);
    }

    public deleteRecipe(recipeId: string): void {
        const recipeIndex = this.recipes.findIndex(recipe => recipe.id === recipeId);
        this.recipes.splice(recipeIndex, 1);
        this.updatedRecipesSub.next([...this.recipes]);
    }

}