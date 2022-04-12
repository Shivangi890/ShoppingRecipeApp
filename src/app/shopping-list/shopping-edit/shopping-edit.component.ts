import { Component, OnDestroy, OnInit, ViewChild, } from'@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoopinglistService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{

  @ViewChild('f',{static:false}) slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;

  // @ViewChild('nameInput',{static:false}) nameInputRef:ElementRef;
  // @ViewChild('amountInput',{static:false}) amountInputRef:ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private slService:ShoopinglistService) { }

  ngOnInit(): void {
     this.slService.startedEditing.subscribe((index:number)=>
     {
       this.editedItemIndex=index;
       this.editMode=true;
       this.editedItem=this.slService.getIngredient(index);
       this.slForm.setValue({
         name:this.editedItem.name,
         amount:this.editedItem.amount

       });
     });



  }
  onSubmit(form:NgForm){
    // const ingName=this.nameInputRef.nativeElement.value;
    // const ingAmount=this.amountInputRef.nativeElement.value;

    const value=form.value;
    const ingAdded=new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredients(this.editedItemIndex,ingAdded);
    }
    else {
    this.slService.addIngredients(ingAdded);
    }
    this.editMode=false;
    form.reset();
    //  this.ingredientAdded.emit(ingAdded);
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.slService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
