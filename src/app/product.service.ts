import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  //Save Product to Firebase DB
  create(product) {
    return this.db.list('/products').push(product);
  }

}
