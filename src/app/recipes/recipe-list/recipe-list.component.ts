import { Component, OnInit,  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(private recipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // the main recipe list copy to show here from 'recipe service'
    this.recipes = this.recipeService.getRecipes(); 
  }

  // New Recipe button
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route })
  }
}
