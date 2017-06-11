import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model'; 
import { Ingredient } from '../shared/ingredient.model'; 
import { ShoppingListService } from '../shopping-list/shopping-list.service'; 

@Injectable() // inject for shopping-list.service  
export class RecipeService {
  // selected recipe Event Emitter 
  recipeSelected = new EventEmitter<Recipe>();
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
    new Recipe('Chapati', 
      'Chapati....testy', 
      'https://upload.wikimedia.org/wikipedia/commons/a/a8/Chicken-kathi-roll-recipe.jpg',
      [
        new Ingredient('Veg', 4),
        new Ingredient('Juice', 1)
      ]),
    new Recipe('Shorma', 
      'Shorma...awesome', 
      'https://upload.wikimedia.org/wikipedia/commons/a/a8/Chicken-kathi-roll-recipe.jpg',
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
}
 