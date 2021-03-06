
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core'

@Injectable()
export class AuthService{
    token: string;

    constructor(private router: Router){

    }
    signupUser(email: string, password: string){
        // builtin firebase SDK 'auth' & 'createUserWithEmailAndPassword' 
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            )
    }

    signinUser(email: string, password: string){
        // builtin firebase SDK 'auth' & 'createUserWithEmailAndPassword'
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['/']); // after login success redirect to page
                    //console.log(response)
                    // after login sending requesting to firebase to get token
                    firebase.auth().currentUser.getIdToken()
                        .then( // then waiting for token to assign it into local variable token
                            (token: string) => this.token = token
                        )
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    getToken(){
      // asyncronizely firebase retrieve token from local stroage and if local stroage token is invalid or time out then 
        // firebase will give token again, so asyncronizely works, so works as promise
      // firebase SDK giving back all method here 
        firebase.auth().currentUser.getIdToken()
            .then( // then waiting for token to assign it into local variable token
                 (token: string) => this.token = token
          );
          return this.token; // it is dangerous to return token, becuase if expired token by timeout or refresing for, return then user can't use as needed. 
          // here just focusing on frontend Angular so just simple purpose using it. 
    }

    isAuthenticatedUser(){
        return this.token !=null; // if not null mean the token valid 
    }

    logout(){
        firebase.auth().signOut();
        this.token = null; 
    }
}