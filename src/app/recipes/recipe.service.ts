import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Recipe } from './recipe.model'; 
import { Ingredient } from '../shared/ingredient.model'; 
import { ShoppingListService } from '../shopping-list/shopping-list.service'; 

@Injectable() // inject for shopping-list.service  
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // selected recipe Event Emitter 
      // recipeSelected = new EventEmitter<Recipe>();
  constructor(private slService: ShoppingListService) { }
  private recipes: Recipe[] = [
    new Recipe(
      'Dürüm Döner', 
      'Dürüm Döner ....nice', 
      'https://upload.wikimedia.org/wikipedia/commons/a/a8/Chicken-kathi-roll-recipe.jpg', 
      [
        new Ingredient('Meat', 2),
        new Ingredient('French Fries', 15)
      ]),
    new Recipe('Ilish Fish', 
      'King of the Fish....testy', 
      'https://3.bp.blogspot.com/-5D_1zKcavFo/VtFMfFuD2mI/AAAAAAAAMBc/ALMSy0tVbn4/s1600/Bhapa%2BShorshe%2BIlish%2B5.JPG',
      [
        new Ingredient('Veg', 4),
        new Ingredient('Juice', 1)
      ]),
    new Recipe('Chicken Biriani', 
      'yahooo...awesome', 
      'http://rupcare.com/wp-content/uploads/2016/09/rupcare_kacchi-biryani-recipe.jpg',
      [
        new Ingredient('Salad', 1),
        new Ingredient('Tea', 3)
      ])    
  ];

// as private recipes, so can't access directly from outside so need to return method 'getRecipes()'
  getRecipes(){
    return this.recipes.slice(); // slice use to get the copy only , not directly recipes editing
  }

  getRecipe(index: number){
    return this.recipes[index]; 
  }
  
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients); 
  }

  // adding new recipe
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice()); // *** important
  }

  // update recipe
  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice()); // *** important
  }

// set recipes by fetching recipes from firebase 
  setRecipes(recipes: Recipe[]){
    this.recipes = recipes; // updating existing recipe by fetching from firebase
    this.recipesChanged.next(this.recipes.slice()); // then final update of the recipe array 
  }

  // delete recipe
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice()); 
  }
}
 