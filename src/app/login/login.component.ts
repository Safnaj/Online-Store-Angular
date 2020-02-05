import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private aFauth: AngularFireAuth) { }

  //Removed onInit Method

  login() {
    console.log("Hello");
    this.aFauth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

}
