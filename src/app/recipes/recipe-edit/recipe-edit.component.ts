import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId: string;
  editMode: boolean;

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.route.paramMap.subscribe((paramsMap: Params) => {
      this.recipeId = paramsMap.params['recipeId'];
      this.editMode = paramsMap.params['recipeId'] != null;
    });
  }

}
