import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { AppUser } from './models/app-user';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';



@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private aFauth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService){
    this.user$ = aFauth.authState;    
   }

  login(){
    //Stores URL in Local Storage to Redirect Back after logged in
    //Working with App Component
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.aFauth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.aFauth.auth.signOut();
  }

  get appUsers$() : Observable<AppUser> {
    return this.user$
    .pipe(switchMap(user => {
      if(user) return this.userService.get(user.uid);
     
      //else
      return of(null);
    }));
  }
}
