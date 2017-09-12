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

onEditItem(index: number){
  // adding into 'Subject', at shopping-list.service, then we can listen that from anywhere as need
      // then it will listent into 'shopping-edit'
  this.slistService.startedEditing.next(index); 
}

// must need to unsubscribe to prevent memory waste because using own Subject 
ngOnDestroy(){
  this.subscription.unsubscribe();
}

}
