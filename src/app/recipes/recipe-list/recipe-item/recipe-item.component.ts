import { Component, OnInit, Input } from '@angular/core';

import {Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service'; 

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // listening recipe from 'recipe-list'
  @Input() recipe: Recipe;  
  @Input() index: number; // index will listen to setup from 'recipe-list'


 // constructor(private recipeService: RecipeService){}
  
  // onSelected(){
  //   // EventEmitter dicleared at recipe service & emit here but output/subscribe of this at "recipes.component.ts"
  //   this.recipeService.recipeSelected.emit(this.recipe); 
  // }
  ngOnInit() {
  }

}
