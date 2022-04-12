import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData{
   idToken:string;
   email:string;
   refreshToken:string;
   expiresIn:string;
   localId:string; 
   registered?:boolean;
}




@Injectable()


export class AuthService{
    // user=new Subject<User>();
    user=new BehaviorSubject<User>(null);
    private tokenExpirationTimer:any;
    constructor(private http:HttpClient,private router:Router){

    }
    signUp(email:string,password:string){
       return this.http.post<AuthResponseData>(
           'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBj6NlRLl7anBzQo1rN3Utb8w7C_BWIpCg',
           {
               email:email,
               password:password,
               returnSecureToken:true
           }).pipe(catchError(this.handleError),
            tap(resData=>
            {
               this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
               //resData=>{
            // const expirationDate=new Date(new Date().getTime() + +resData.expiresIn*1000);
            //    const user=new User(resData.email,resData.localId,resData.idToken,expirationDate);
            //    this.user.next(user);
           }));
    }

    private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
        const expirationDate=new Date(new Date().getTime() + expiresIn*1000);
                const user=new User(email,userId,token,expirationDate);
                this.user.next(user);
                this.autoLogout(expiresIn*1000);
                localStorage.setItem('userData',JSON.stringify(user));
    }
    

    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        // localStorage.clear();
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }
    autoLogout(expirationDuration:number){
        this.tokenExpirationTimer=setTimeout(()=>{
            this.logOut();
        },expirationDuration);
        console.log(this.tokenExpirationTimer);
    }

    logIn(email:string,password:string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBj6NlRLl7anBzQo1rN3Utb8w7C_BWIpCg',{
            email:email,
            password:password,
            returnSecureToken:true,
        }).pipe(catchError(this.handleError),tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }));
    }


    autoLogin(){
        const userData:{
            email:string;
            id:string;
            _token:string;
            _tokenExpirationDate:string;
        }=JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return ;
        }
        console.log('hello');
        const loadedUser=new User(
            userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedUser.token){
            console.log(loadedUser);
            this.user.next(loadedUser);
            // const expirationDuration=(new Date(userData._tokenExpirationDate).getTime())-(new Date().getTime());
            // this.autoLogout(expirationDuration);
        }
    }

    private handleError(errorRes:HttpErrorResponse){
        let errorMessage="An unknown error occured";
               if(!errorRes.error && !errorRes.error.error){
                   return throwError(errorMessage);
               }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS': 
                    errorMessage='Email already exists';
                break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage='Email doesn not exist';
                break;
                case 'INVALID_PASSWORD':
                    errorMessage='Password is not valid';
                break;
            }
            return throwError(errorMessage);
    }
}