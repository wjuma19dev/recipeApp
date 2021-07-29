import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: [
  ]
})
export class RecipeListComponent implements OnInit{

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.fetchAll;
  }

}
