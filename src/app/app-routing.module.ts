import { AuthComponent } from './auth/auth.component';
import { RecipeResolveService } from './recipes/recipe-resolve.service';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

// Componentes
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
    {
        path: 'recipes', 
        component: RecipesComponent,
        children: [
            {path: '', component: RecipeStartComponent},
            {path: 'new', component: RecipeEditComponent},
            {path: ':recipeId', component: RecipeDetailComponent, resolve: [RecipeResolveService]},
            {path: ':recipeId/edit', component: RecipeEditComponent, resolve: [RecipeResolveService]}
        ]
    },
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'auth', component: AuthComponent},
    {path: '', redirectTo: 'recipes', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
