import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model'; 
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // initially it is undefined & value will be available at 'ngOnInit'
  recipes: Recipe[]; // recipes is a variable & Recipe[] is type of the variable 
  subscription: Subscription; 
  // 'Router' need to navigate
  // injecting service
  constructor(private recipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
   this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[])=> {
          this.recipes = recipes;
        }
      )
    // the main recipe list copy to show here from 'recipe service'
    this.recipes = this.recipeService.getRecipes(); 
  }

  // New Recipe button
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
