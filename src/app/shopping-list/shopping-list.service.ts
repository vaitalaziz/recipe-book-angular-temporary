import { EventEmitter } from '@angular/core'; 
import { Ingredient } from '../shared/ingredient.model';  
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
   //ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>(); // it can listen from anywhere, we listen into 'shopping-edit'
   
   private ingredients: Ingredient[] = [
    new Ingredient('Apple',  3),
    new Ingredient('Banana',  10)
  ]; 

  getIngredients(){
      return this.ingredients.slice(); 
  }

  // return the selected ingredient from ingredients[theSelectedIndex]
  getIngredient(index: number){
      return this.ingredients[index]; 
  }

  addIngredient(ingredient: Ingredient){
      this.ingredients.push(ingredient);
    //this.ingredientsChanged.emit(this.ingredients.slice());
    
// very important **  need emit to have always get the update ingredients array after adding/deleting....
      this.ingredientsChanged.next(this.ingredients.slice()); 
  }
  addIngredients(ingredients: Ingredient[]){
    //   for (let ingredient of ingredients) {
    //       this.addIngredient(ingredient);
    //   }  this for loop can use but might lot of events so better bellow code 
     
     // ES6 feature spread operator(...) array of elements turn into list of elements  
     // ... ingredients into list of single ingredients 
      this.ingredients.push(...ingredients);
     // all ingredients one go & then emit  
      this.ingredientsChanged.next(this.ingredients.slice()); 
  }

  updateIngredient(index: number, newIngredient: Ingredient){
      this.ingredients[index] = newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice()); 
  }

  deleteIngredient(index: number){
      this.ingredients.splice(index, 1); // splice the selected ingredient from the ingredients
      // then need to update the ingredients array, so
      this.ingredientsChanged.next(this.ingredients.slice());
  }
}