
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';
import { RecipeService } from '../recipes/recipe.service'; 
import { Recipe } from '../recipes/recipe.model'

@Injectable()
export class DataStroageService{
    constructor(private http: Http, private recipeService: RecipeService){}
    
    storageRecipes(){
        // here 'put' request for firebase, it depends on base on my backend 
        // getRecipes method will bring recipes list and pass to put method to save into firebase
        // returning observable
       return  this.http.put('https://aziz-ng-recipe-book.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecipes(){
        this.http.get('https://aziz-ng-recipe-book.firebaseio.com/recipes.json')
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json(); // fetching recipe from firebase & json format convert into js.
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']){ // if recipe['ingredients'] doesn't exist then will be added as empty property, during fetching from firebase 
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