import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styles: [
  ]
})
export class RecipesComponent implements OnInit {

  recipeLoaded: Recipe;

  constructor(private recipeServise: RecipeService) {}

  ngOnInit(): void {
    this.recipeServise.selectedRecipe
      .subscribe(recipe => {
        this.recipeLoaded = recipe;
      })
  }

}
