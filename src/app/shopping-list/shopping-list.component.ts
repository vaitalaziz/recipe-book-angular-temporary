import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service'; 
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];  
  private subscription: Subscription;

  constructor(private slistService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slistService.getIngredients(); 
    this.subscription = this.slistService.ingredientsChanged
        .subscribe(
          (ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
          });
  }

ngOnDestroy(){
  this.subscription.unsubscribe();
}

}
