import { CartItem } from "./CartItem.ts";

export class Cart {
  private items: CartItem[] = [];

  addItem(item: CartItem) {
    this.items.push(item);
  }

  removeItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  getItems() {
    return this.items;
  }

  getTotalQuantity() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);
  }

  clear() {
    this.items = [];
  }
}