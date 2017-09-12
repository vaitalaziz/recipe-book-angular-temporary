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
  // no need becauase we don't use local ref so
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('f') slForm: NgForm;
  // subscribe edit component need to unsubscribe to prevent memory waste, so need Subscription
  subscription: Subscription; 
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private slistService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slistService.startedEditing
      .subscribe(
        (index: number) => {
          this.editItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slistService.getIngredient(index); 
          // after retrieving all info need to set new value in that form 
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })

        }
      ); 
  }

  onUpdateOrAddItem(form: NgForm){ // const used bcz no planning to change so, otherwise 'let' use
  // no need becauase we odn't use local ref so
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // checking editMode 
    if (this.editMode){
      this.slistService.updateIngredient(this.editItemIndex, newIngredient)
    } // or adding brand new ingredient 
    else {
      this.slistService.addIngredient(newIngredient); 
    }
    this.editMode = false; // for Update button 
    form.reset();
    //
    
     
  }

  ngOnDestroy(){
    this.subscription.unsubscribe(); 
  }

}
