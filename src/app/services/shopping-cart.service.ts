import { title } from 'process';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  

  // async getCart(): Promise<Observable<ShoppingCart>> {
  //   const cartId = await this.getOrCreateCartId();

  //   return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
  //     .pipe(map(x => new ShoppingCart(x.payload.exportVal().items)));
  // }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
        .object('/shopping-carts/' + cartId)
        .valueChanges()
        .pipe(map((x)=> (x) ? new ShoppingCart(( x as any).items): (x as any)
    ));
  }

  async addToCart(product : Product){
    this.updateItem(product, 1);
  }

  async removeFromCart(product : Product){
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }  

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item = this.getItem(cartId, product.key);
    console.log(JSON.stringify(product));

    item
      .valueChanges()
      .pipe(take(1))
      .subscribe((data: ShoppingCartItem) => {
        const quantity = (data ? (data.quantity || 0) : 0) + change; // Used || to avoid null reference error

        if (!quantity)
          item.remove();

        else
          item.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity
          });
      });
  }
  
}
