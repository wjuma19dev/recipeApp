import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

import { AuthGuardService } from '../auth/auth.guard';
import { RecipeResolveService } from './recipe-resolve.service';


import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';

const routes: Routes = [
    {
        path: 'recipes', 
        component: RecipesComponent,
        canActivate: [AuthGuardService],
        children: [
            {path: '', component: RecipeStartComponent},
            {path: 'new', component: RecipeEditComponent},
            {path: ':recipeId', component: RecipeDetailComponent, resolve: [RecipeResolveService]},
            {path: ':recipeId/edit', component: RecipeEditComponent, resolve: [RecipeResolveService]}
        ]
    },
    { path: '', redirectTo: 'recipes', pathMatch: 'full' }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {}