import { ShoppingListService } from './shopping-list.sevice';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
  ]
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];
  
  constructor(private shopListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shopListService.find();
    this.shopListService.updatedIngredientList
      .subscribe(ingredients => {
        this.ingredients = ingredients;
      })
  }

  onAddNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}
