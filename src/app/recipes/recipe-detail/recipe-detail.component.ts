import { Component, OnInit, Input } from '@angular/core';

import {Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service'; 

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // reciving recipe from recipes.component where as subscribe recipeSelected..... 
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }
  onAddToShoppingList(){
    // through recipe service 
    // in recipe service inject shopping-list servie to emit below code
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
