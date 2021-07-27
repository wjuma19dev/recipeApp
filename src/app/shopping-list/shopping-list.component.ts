import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
  ]
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('2 slices bacon, cut into 1/2" pieces', 10),
    new Ingredient('1 lb. green beans, trimmed and halved', 50)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
