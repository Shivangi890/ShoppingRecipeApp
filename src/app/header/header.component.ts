import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})


export class HeaderComponent implements OnInit,OnDestroy{
//    @Output()  featureSelected =new EventEmitter<string>();

//     onSelect(feature:string){
//         this.featureSelected.emit(feature);
//     }
isAuthenticated=false;
private userSub:Subscription;


constructor(private dataStorage:DataStorageService,private authService:AuthService){
    
}
ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(user=>{
        this.isAuthenticated=!!user;
        console.log(!user);
        console.log(!!user);
    });
    
}
onSaveData(){
    this.dataStorage.storeRecipes();
}
onFetchData(){
    this.dataStorage.fetchRecipes().subscribe();
}
onLogout(){
    this.authService.logOut();
}
ngOnDestroy(): void {
    this.userSub.unsubscribe();
}

}