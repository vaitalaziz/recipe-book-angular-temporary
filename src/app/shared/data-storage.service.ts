
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from '../auth/auth.service'

import 'rxjs/Rx';
import { RecipeService } from '../recipes/recipe.service'; 
import { Recipe } from '../recipes/recipe.model'

@Injectable()
export class DataStroageService{
    constructor(private http: Http, private recipeService: RecipeService,
                private authService: AuthService){}
    
    storageRecipes(){
        const token = this.authService.getToken();
        // here 'put' request for firebase, it depends on base on my backend 
        // getRecipes method will bring recipes list and pass to put method to save into firebase
        // returning observable
       return  this.http.put('https://aziz-ng-recipe-book.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes(){
        const token = this.authService.getToken();
        // query parameter = ?auth=' + token
        this.http.get('https://aziz-ng-recipe-book.firebaseio.com/recipes.json?auth=' + token)
            .map(
                (response: Response) => {
                    // fetching recipe from firebase & json format convert into js.
                    const recipes: Recipe[] = response.json(); 
                    for (let recipe of recipes) {
                        // if recipe['ingredients'] doesn't exist then will be added as empty property, during fetching from firebase
                        if (!recipe['ingredients']){  
                        //console.log(recipe); 
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes; // returing th eupdated recipes array  
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {                    
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}