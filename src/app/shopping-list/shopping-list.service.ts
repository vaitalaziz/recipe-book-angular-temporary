import { EventEmitter } from '@angular/core'; 
import { Ingredient } from '../shared/ingredient.model';  

export class ShoppingListService {
   ingredientsChanged = new EventEmitter<Ingredient[]>();
   
   private ingredients: Ingredient[] = [
    new Ingredient('Apple',  3),
    new Ingredient('Banana',  10)
  ]; 

  getIngredients(){
      return this.ingredients.slice(); 
  }

  addIngredient(ingredient: Ingredient){
      this.ingredients.push(ingredient);
// very important **  need emit to have always get the update ingredients array after adding/deleting....
      this.ingredientsChanged.emit(this.ingredients.slice()); 
  }
  addIngredients(ingredients: Ingredient[]){
    //   for (let ingredient of ingredients) {
    //       this.addIngredient(ingredient);
    //   }  this for loop can use but might lot of events so better bellow code 
     
     // ES6 feature spread operator(...) array of elements turn into list of elements  
     // ... ingredients into list of single ingredients 
      this.ingredients.push(...ingredients);
     // all ingredients one go & then emit  
      this.ingredientsChanged.emit(this.ingredients.slice()); 
  }
}