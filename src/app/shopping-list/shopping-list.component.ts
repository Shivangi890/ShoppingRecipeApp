import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoopinglistService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients: Ingredient[];
private idChangeSubscription:Subscription;
  //
  //   new Ingredient('Apples',5),
  //   new Ingredient('Tomatoes', 4 )
  // ];
  constructor(private slService:ShoopinglistService) { }

  ngOnInit(): void {
    this.ingredients=this.slService.getIngredients();
    this.idChangeSubscription=this.slService.ingredientChanged.subscribe(
      (ingredients:Ingredient[])=>{this.ingredients=ingredients;});
    
  }
  // onAddedIngredient(ingredient:Ingredient){
  //     this.ingredients.push(ingredient);
  // }
  onEditItem(index:number){
    this.slService.startedEditing.next(index);

  }

  ngOnDestroy(): void {
      this.idChangeSubscription.unsubscribe();
  }


}
