import { ShoppingListService } from './shopping-list.sevice';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  ingChangeValues: Subscription;
  
  constructor(private shopListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shopListService.find();
    this.ingChangeValues = this.shopListService.updatedIngredientList
      .subscribe(ingredients => {
        this.ingredients = ingredients;
      })
  }

  onAddNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  ngOnDestroy(): void {
    this.ingChangeValues.unsubscribe();
  }

  onEditIngredient(index: number) {
    this.shopListService.selectedIngredientToEdit.next(index);
  }

}
