import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private aFauth: AngularFireAuth) { 
    aFauth.authState.subscribe(x=> console.log(x));
  }

  //Removed OnInit 

  logout() {
    this.aFauth.auth.signOut();
  }
 

}
