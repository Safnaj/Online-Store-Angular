import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  //Saving User to Firebase
  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  //Get User By ID
  get(uid: string): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
  } 
  
}
