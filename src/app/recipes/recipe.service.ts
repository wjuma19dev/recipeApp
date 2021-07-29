import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    selectedRecipe: EventEmitter<Recipe> = new EventEmitter();

    recipes: Recipe[] = [
        new Recipe('Stir Fry Green Beans', 'Stir-fries are fast, easy, and simple, and this classic green bean offering is no different.', 'beans.jpg', [
            {name: '2 (6-oz.) salmon fillets', amount: 35},
            {name: '2 tsp. extra-virgin olive oil', amount: 15}
        ]),
        new Recipe('Zucchini Salad', 'It\"s hot and humid and you really don\"t want to cook: just the thought of turning on a burner boils your blood', 'zucchini.jpg', [
            {name: '2 tbsp. whole grain mustard', amount: 89},
            {name: '1 tbsp. packed brown sugar', amount: 15}
        ])
    ];

    constructor() {}

    get fetchAll() {
        return this.recipes.slice();
    }

}