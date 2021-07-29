import { RecipeService } from './../recipe.service';
import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from './../../shopping-list/shopping-list.sevice';
import { Recipe } from './../recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private shopListService: ShoppingListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: Params) => {
      const recipeId = paramMap.params['recipeId'];
      this.recipe = this.recipeService.getRecipe(recipeId);
    })
  }

  onAddToShoppingList() {
    this.shopListService.addIngredients(this.recipe.ingredients);
  }

}
