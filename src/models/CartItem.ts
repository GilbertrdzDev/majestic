import { Product } from "./Product.ts";

export class CartItem {
  id: number;
  product: Product;
  quantity: number;

  constructor(id: number, product: Product, quantity: number) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
  }
}