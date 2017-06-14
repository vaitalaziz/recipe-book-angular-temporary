import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'; 

import {Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service'; 

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // reciving recipe from recipes.component where as subscribe recipeSelected..... 
  // @Input() recipe: Recipe;

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, 
                private route: ActivatedRoute,
                private router: Router) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id); 
      }
    ); 
  }
  onAddToShoppingList(){
    // through recipe service 
    // in recipe service inject shopping-list servie to emit below code
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe(){
    // for complex route path way:  
      // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); 
     this.router.navigate(['edit'], {relativeTo: this.route}); 
  }
}
