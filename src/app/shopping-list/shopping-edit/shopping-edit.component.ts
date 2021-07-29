import { ShoppingListService } from './../shopping-list.sevice';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [
  ]
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('ingName') ingName: ElementRef;
  @ViewChild('ingAmount') ingAmount: ElementRef;

  constructor(private shopListService: ShoppingListService) { }

  ngOnInit(): void {}

  onAddRecipe() {
    const name: string = (<HTMLInputElement>this.ingName.nativeElement).value;
    const amount: number = +(<HTMLInputElement>this.ingAmount.nativeElement).value;
    const newIngrediente = new Ingredient(name, amount);
    this.shopListService.save(newIngrediente);
  }

}
