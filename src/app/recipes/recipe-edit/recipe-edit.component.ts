import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';  
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

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
    //console.log(this.recipeForm);
    // want to updated the existing one OR array of recipes
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'] ); 

// as above we folloing same sequence or order & as our form also same order, 
  //  so as reactive way just follow the form value shortway  
    if(this.editMode){
      // this.recipeService.updateRecipe(this.id, newRecipe);
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      // this.recipeService.addRecipe(newRecipe);
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  onAddIngredient(){
    //this.recipeForm.get('ingredients') // this angular can't realize that 'FormArray' so need to cast 
    // cast sign <> // cast into 'FormArray' use <FormArray>
    // push new 'FormGroup', so for that need new control name as well  
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );

  }

// delete ingredient 
  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index); 
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
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/) // must need '//' sign
              ])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    }); 
  }

}
