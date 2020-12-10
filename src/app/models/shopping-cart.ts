import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    // Since we're using the push method, initializing to an empty array to avoid null exception error
    items?: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem}) {
        this.itemsMap = itemsMap || {};

        // tslint:disable-next-line: forin
        for (let productId in itemsMap) {
          let item = itemsMap[productId];        
          this.items.push(new ShoppingCartItem({ ...item, key: productId })); // Objects that we get from firebase, so we map to shopping-cart-item object
        }
    }
    
    getQuantity(product: Product) {
      let item = this.itemsMap[product.key];
      return item ? item.quantity : 0;
    }

    get totalPrice(){
      let sum = 0;
      for (let productId in this.items)
        sum += this.items[productId].totalPrice;
      return sum;
    }
    
    get totalItemsCount(){
      let count = 0;
      for(let productId in this.items)
        count += this.items[productId].quantity
      return count;
    }
}