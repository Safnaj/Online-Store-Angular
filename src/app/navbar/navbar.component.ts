import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { 

  constructor(public auth: AuthService) { 
    //aFauth.authState.subscribe(user => this.user = user);    
  }

  //Removed OnInit 

  logout() {
    this.auth.logout();
  }
 

}
