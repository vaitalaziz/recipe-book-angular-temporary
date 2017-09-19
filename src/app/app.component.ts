import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  // //loadedFeature = 'recipe';
  
  // onNavigate(feature: string){
  //   //  this.loadedFeature = feature;
  // }

// at app starting time need to start firebase SDK so best place to initialize firebase here 
ngOnInit(){
  firebase.initializeApp({
    // these key value pairs got from firebase 'WEB SETUP' 
    apiKey: "AIzaSyCA_VqWFQLMcAjjCvO-Ngdu3Vuf1a3JJao",
    authDomain: "aziz-ng-recipe-book.firebaseapp.com"
  });
}

}


