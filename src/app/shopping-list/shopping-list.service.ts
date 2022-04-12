import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";
import { Subject} from "rxjs";

export class ShoopinglistService{
    // ingredientChanged=new EventEmitter<Ingredient[]>();
    ingredientChanged=new Subject<Ingredient[]>();
    startedEditing=new Subject<number>();

    private ingredients: Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes', 4 )
      ];

      getIngredients(){
          return this.ingredients.slice();
      }

      getIngredient(index:number){
          return this.ingredients[index];
      }

      addIngredients(ingredients:Ingredient){
          this.ingredients.push(ingredients);
        //   this.ingredientChanged.emit(this.ingredients.slice());
          this.ingredientChanged.next(this.ingredients.slice());       //if we use subjects then we have to use next method for that


      }

      addedIngredients(ingredients:Ingredient[])                                  //use for ingredients of recipe direct in shooping list
      {  
           for (let ingredient of ingredients){
               this.addIngredients(ingredient);
           }
      }

      updateIngredients(index:number,newIngredient:Ingredient){
          this.ingredients[index]=newIngredient;
          this.ingredientChanged.next(this.ingredients.slice());
      }
      deleteIngredients(index:number){
          this.ingredients.splice(index,1);
          this.ingredientChanged.next(this.ingredients.slice());
      }
}