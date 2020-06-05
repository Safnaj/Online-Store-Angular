import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  //Save Product to Firebase DB
  create(product) {
    return this.db.list('/products').push(product);
  }

  //Get All Products
  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(
      map((products: any[]) => products.map(prod => {
        const payload = prod.payload.val();
        const key = prod.key;
        return <any>{ key, ...payload };
      })),
    );
  }

  get(productId) {
    return this.db.object('/products/' +productId).valueChanges();
  }
  

}
