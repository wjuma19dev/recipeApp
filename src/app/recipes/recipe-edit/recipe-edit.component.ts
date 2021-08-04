import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit {

  recipeId: string;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ){}

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(): void {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap: Params) => {
      this.recipeId = paramsMap.params['recipeId'];
      this.editMode = paramsMap.params['recipeId'] != null;
      this.formInit();
    });
  }

  private formInit(): void {
    // Initial Values of Recipe Edit Form
    const recipe = { name: '', imageUrl: '', description: '', ingredients: new FormArray([]) }

    // If editMode is On
    if(this.editMode) {
      const recipeLoaded = this.recipeService.getRecipe(this.recipeId);
      recipe['name'] = recipeLoaded.name;
      recipe['imageUrl'] = recipeLoaded.imageUrl;
      recipe['description'] = recipeLoaded.description;

      // Verify is recipe has ingredients and obtain your values
      if(recipeLoaded['ingredients']) {
        for (let ingredient of recipeLoaded.ingredients) {
          recipe.ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }

    // Form Building
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imageUrl': new FormControl(recipe.imageUrl, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': recipe.ingredients
    });
  }

  onSubmit() {
    let newRecipe: Recipe = new Recipe(
      this.recipeId,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imageUrl'],
      this.recipeForm.value['ingredients']
    );

    if(this.editMode) {
      this.recipeService.updateRecipe(this.recipeId, newRecipe);
    } else {
      newRecipe.id = uuidv4();
      this.recipeService.addRecipe(newRecipe);
    }

    this.onCancel();
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
