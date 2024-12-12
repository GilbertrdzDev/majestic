export class Product {
  id: number;
  name: string | undefined;
  price: number;

  constructor(id: number, name: string | undefined, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}