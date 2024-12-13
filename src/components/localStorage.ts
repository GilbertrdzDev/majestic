import { Cart } from "../models/Cart.ts";
import { CartItem } from "../models/CartItem.ts";
import { Product } from "../models/Product.ts";

export class LocalStorage {
  static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }

  static key(index: number) {
    return localStorage.key(index);
  }

  static get length() {
    return localStorage.length;
  }

  static get storage() {
    return localStorage;
  }

  static getCart(): Cart {
    let cartItems = LocalStorage.getItem('cart');
    const cart = new Cart();
    if (cartItems) {
      cartItems.forEach((item: any) => {
        item = new CartItem(
          item.id,
          new Product(
            item.product.id,
            item.product.name,
            item.product.price,
            item.product.image,
          ),
          item.quantity,
        );
        cart.addItem(item);
      });
    }
    return cart;
  }
}