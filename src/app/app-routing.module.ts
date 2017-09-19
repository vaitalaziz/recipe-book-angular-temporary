
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent} from './recipes/recipe-start/recipe-start.component'; 
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component'; 
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component'; 
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';
// all routes 
const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: RecipeStartComponent },
        {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]}, // 'new' would be before of 'id'
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]},
    ] },
    { path: 'shopping-list', component: ShoppingListComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent}
]; 

// need to do it
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    
}

