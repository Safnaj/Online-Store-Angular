import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { 
  appUser: AppUser;

  constructor(private auth: AuthService) { 
   auth.appUsers$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }
 

}
