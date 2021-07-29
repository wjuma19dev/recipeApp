import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from './../../shopping-list/shopping-list.sevice';
import { Recipe } from './../recipe.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: [
  ]
})
export class RecipeDetailComponent {

  @Input() recipe: Recipe;

  constructor(private shopListService: ShoppingListService) {}

  onAddToShoppingList() {
    this.shopListService.addIngredients(this.recipe.ingredients);
  }

}
