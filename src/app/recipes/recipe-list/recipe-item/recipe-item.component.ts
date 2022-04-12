import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
// import { RecipeService } from '../../recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // @Output() recipeSelected =new EventEmitter<void>();    //dont need to make this binding property use services instead of these
  @Input() recipe : Recipe; 

  // constructor(private recipeSelectedService:RecipeService) { }

   @Input() index:number;
   
  ngOnInit() {}

  // onSelected(){
  //   this.recipeSelectedService.recipeSelected.emit(this.recipe);
  // }
  
}
