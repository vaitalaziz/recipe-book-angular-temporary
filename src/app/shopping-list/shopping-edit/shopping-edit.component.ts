import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model'; 
import { ShoppingListService } from '../shopping-list.service'; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // no need becauase we odn't use local ref so
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  

  constructor(private slistService: ShoppingListService) { }

  ngOnInit() {
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

}
