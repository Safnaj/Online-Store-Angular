import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {  
    return this.auth.appUsers$
    .pipe(map(appUser => appUser.isAdmin));    
  }  

  // canActivate(): Observable<boolean> {
  //   return this.auth.user$.pipe(switchMap((user: firebase.User) =>
  //     this.userService.get(user.uid)).
  //     map((appUser) => appUser.isAdmin));
  //  }

}
