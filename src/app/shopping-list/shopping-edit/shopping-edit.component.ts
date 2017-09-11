import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'; 

import { Ingredient } from '../../shared/ingredient.model'; 
import { ShoppingListService } from '../shopping-list.service'; 


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // no need becauase we odn't use local ref so
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  
  subscription: Subscription; 
  editMode = false;
  editItemIndex: number;

  constructor(private slistService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slistService.startedEditing
      .subscribe(
        (index: number) => {
          this.editItemIndex = index;
          this.editMode = true;
        }
      ); 
  }

  onAddItem(form: NgForm){ // const used bcz no planning to change so, otherwise 'let' use
  // no need becauase we odn't use local ref so
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    //
    this.slistService.addIngredient(newIngredient); 
     
  }

  ngOnDestroy(){
    this.subscription.unsubscribe(); 
  }

}
