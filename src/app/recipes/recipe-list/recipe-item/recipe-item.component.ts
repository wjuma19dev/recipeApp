import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipe.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styles: [
  ]
})
export class RecipeItemComponent {

  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

}
