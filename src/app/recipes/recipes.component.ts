import { Component, OnInit } from '@angular/core';

import {Recipe} from './recipe.model'; 
//import { RecipeService } from './recipe.service'; 

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  // RecieService moved to app.module.ts, to be avilable recipes component always 
  //providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  
  // 
  // selectedRecipe: Recipe;
  
 // constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  //   // selected recipe emit at 'recipe-item' & subscribe(listening) here 
  //   this.recipeService.recipeSelected.subscribe(
  //     (recipe: Recipe) => {
  //       this.selectedRecipe = recipe;
  //     }
  //   );
  // 
}

}
