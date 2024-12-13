export class Product {
  id: number;
  name: string | undefined;
  price: number;
  image: string | undefined | null;

  constructor(
    id: number,
    name: string | undefined,
    price: number,
    image: string | undefined | null,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}