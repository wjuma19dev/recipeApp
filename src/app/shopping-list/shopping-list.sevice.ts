import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {

    updatedIngredientList: EventEmitter<Ingredient[]> = new EventEmitter();

    ingredients: Ingredient[] = [
        new Ingredient('2 slices bacon, cut into 1/2" pieces', 10),
        new Ingredient('1 lb. green beans, trimmed and halved', 50)
    ];

    find(): Ingredient[] {
        return this.ingredients.slice();
    }

    save(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.updatedIngredientList.emit(this.ingredients.slice());
    }
    
    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.updatedIngredientList.emit(this.ingredients.slice());
    }
}