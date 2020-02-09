import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user$: Observable<firebase.User>;

  constructor(private aFauth: AngularFireAuth) { 
    //aFauth.authState.subscribe(user => this.user = user);
    this.user$ = aFauth.authState;    
  }

  //Removed OnInit 

  logout() {
    this.aFauth.auth.signOut();
  }
 

}
