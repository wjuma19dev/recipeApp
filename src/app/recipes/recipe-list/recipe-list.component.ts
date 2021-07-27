import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: [
  ]
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Stir Fry Green Beans', 'Stir-fries are fast, easy, and simple, and this classic green bean offering is no different.', 'beans.jpg'),
    new Recipe('Zucchini Salad', 'It\"s hot and humid and you really don\"t want to cook: just the thought of turning on a burner boils your blood', 'zucchini.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
    console.log(this.recipes);
  }

}
