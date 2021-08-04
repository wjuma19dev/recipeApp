import { RecipeService } from './../recipe.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.sevice';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private shopListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: Params) => {
      const recipeId = paramMap.params['recipeId'];
      this.recipe = this.recipeService.getRecipe(recipeId);
    });
  }

  onAddToShoppingList(): void {
    this.shopListService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe(recipeId: string): void {
    this.recipeService.deleteRecipe(recipeId);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
