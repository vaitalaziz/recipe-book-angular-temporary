import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';  
import { RecipeService } from '../recipe.service'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false; 
  recipeForm: FormGroup;
// need to retrieve id so need 'ActivatedRoute'  
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; // 'id' named as in <app-routing.module>
          this.editMode = params['id'] !=null; 
           console.log(this.editMode); 
           this.initForm();
        }
      )
       
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

  onAddIngredient(){
    //this.recipeForm.get('ingredients') // this angular can't realize that 'FormArray' so need to cast 
    // cast sign <> // cast into 'FormArray' use <FormArray>
    // push new 'FormGroup', so for that need new control name as well  
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    );

  }

  // Reactive approach
  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // default don't have any Ingredients so empty array
    let recipeIngredients = new FormArray([]);
// if in editMode then: 
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name; 
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description; 
      if(recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    }); 
  }

}
