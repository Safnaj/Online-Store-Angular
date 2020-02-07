import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user: firebase.User;

  constructor(private aFauth: AngularFireAuth) { 
    aFauth.authState.subscribe(user => this.user = user);
  }

  //Removed OnInit 

  logout() {
    this.aFauth.auth.signOut();
  }
 

}
