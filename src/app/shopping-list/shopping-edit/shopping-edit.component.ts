import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [
  ]
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f') ingredientForm: NgForm;

  editMode: boolean = false;
  indexIngredient: number;
  editedItem: Ingredient;

  constructor(private shopListService: ShoppingListService) { }

  ngOnInit(): void {

    this.shopListService.selectedIngredientToEdit.subscribe(index => {
      this.indexIngredient = index;
      this.editMode = true;
      this.editedItem = this.shopListService.getIngredient(index);
      this.ingredientForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onSubmit(ingredientForm: NgForm) {
    const values = ingredientForm.value;
    const newIngredient = {name: values.name, amount: values.amount}

    if(this.editMode) {
      this.shopListService.update(this.indexIngredient, newIngredient);
    } else {
      this.shopListService.save(newIngredient);
    }

    this.editMode = false;
    this.ingredientForm.reset();
  }

  onDelete() {
    this.shopListService.delete(this.indexIngredient);
    this.onClear();
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

}
