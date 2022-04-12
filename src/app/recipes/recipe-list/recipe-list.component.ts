import { Component, OnInit, EventEmitter ,Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  // @Output() recipeWasSelected=new EventEmitter<Recipe>();     //delete this ouput decorator too for using services

  subscription:Subscription;

  recipes: Recipe[];                              //since we use services for that ;
// [ new Recipe('A Test Recipe', 'This is simply a test',
//       'https://www.saveur.com/uploads/2020/11/20/Y7RZPFZEERAZVHJ2VHC2RXMEEY.jpg?quality=85&width=540'),
//     new Recipe('A Test Recipe', 'An another Recipe details',
//       'https://www.saveur.com/uploads/2020/11/20/Y7RZPFZEERAZVHJ2VHC2RXMEEY.jpg?quality=85&width=540')
//   ];

  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    // this.recipeService.recipeChanged.subscribe(
    //   (recipes:Recipe[])=>{
    //     this.recipes=recipes;

    // })
       this.recipes=this.recipeService.getRecipes();
  }

      
  
  // onRecipeSelected(recipe:Recipe){
  //   this.recipeWasSelected.emit(recipe);
 
  // }

  onCreateNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});

  }
  // ngOnDestroy(): void {
  //     this.subscription.unsubscribe();
  // }

}
