import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoopinglistService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService{
  // recipeSelected =new EventEmitter<Recipe>();

  recipeChanged=new Subject<Recipe[]>();
  recipeSelected =new Subject<Recipe>();

    // private recipes: Recipe[]=  [ 
    //   new Recipe(
    //     'Fried Rice', 
    //     'Fried rice has been a kitchen staple since as early as the Sui Dynasty (589–618 CE) in China.The primary reason for the continued popularity and ubiquity of this dish comes down to two things: its adaptability and the fact that people almost always cook too much rice to eat in one sitting.',
    //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbpIMoTCkQ7S-uT03zXEvFuY4Wd_BLafoUWw&usqp=CAU',
    //   [
    //   new Ingredient('Chilli con carne',2),
    //   new Ingredient('Sliced beef', 3),
    //   new Ingredient('Tomato',4),
    //   new Ingredient('Nachos',2),
    //   new Ingredient('Cool mayo', 1)

    // ]),
    
    //   new Recipe(
    //     'Big Fat Burger', 
    //     'Freshly baked brioche bun, handmade 8oz prime beef patty, pepperoni, 2 cheese slices, crisp lettuce, sliced beef, tomato, onion rings and tasty special burger relish.',
    //   'https://gourmet4.uk/wp-content/uploads/2020/11/The-Stack-1.jpeg',
    //   [new Ingredient('Chilli con carne',2),
    //   new Ingredient('Sliced beef', 3),
    //   new Ingredient('Tomato',4),
    //   new Ingredient('Nachos',2),
    //   new Ingredient('Cool mayo', 1)] )
    // ];
    private recipes:Recipe[]=[];

    constructor(private shoopinglistService:ShoopinglistService){}

    getRecipes(){
        return this.recipes.slice();
   }

  getRecipe(index:number){
    return this.recipes[index];
  }
   setRecipes(recipes:Recipe[]){
     this.recipes=recipes;
     this.recipeChanged.next(this.recipes);
   }

  addIngredientsToShoopinglist(ingredient:Ingredient[]){
        this.shoopinglistService.addedIngredients(ingredient);
  }
  addRecipe(recipe:Recipe){
     this.recipes.push(recipe);
     this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number,newRecipe:Recipe){
      this.recipes[index]=newRecipe;
      this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

}