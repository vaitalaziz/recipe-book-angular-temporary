import { Component, OnInit,  } from '@angular/core';

import { Recipe } from '../recipe.model'; 
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // initially it is undefined & value will be available at 'ngOnInit'
  recipes: Recipe[]; // recipes is a variable & Recipes[] is type of the variable 
  
  // injecting service
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    // the main recipe list copy to show here from 'recipe service'
    this.recipes = this.recipeService.getRecipes(); 
  }

}
