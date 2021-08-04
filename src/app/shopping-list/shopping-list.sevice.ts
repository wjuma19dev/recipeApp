import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {

    public updatedIngredientList: Subject<Ingredient[]> = new Subject();
    public selectedIngredientToEdit: Subject<number> = new Subject();

    ingredients: Ingredient[] = [
        new Ingredient('2 slices bacon, cut into 1/2" pieces', 10),
        new Ingredient('1 lb. green beans, trimmed and halved', 50)
    ];

    find(): Ingredient[] {
        return this.ingredients.slice();
    }

    save(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.updatedIngredientList.next(this.ingredients.slice());
    }

    public getIngredient(index: number) {
        return { ...this.ingredients[index] }
    }
    
    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.updatedIngredientList.next([...this.ingredients]);
    }

    update(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.updatedIngredientList.next([...this.ingredients]);
    }

    delete(index: number) {
        this.ingredients.splice(index, 1);
        this.updatedIngredientList.next([...this.ingredients]);
    }
}