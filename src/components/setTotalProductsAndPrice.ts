import { LocalStorage } from "./localStorage.ts";
import { wait } from "./wait.ts";

let elTotalProducts: HTMLElement | null = null;
let elTotalPrice: HTMLElement | null = null;

export const setTotalProductsAndPrice = async () => {

  const cart = LocalStorage.getCart();

  if (!elTotalProducts || !elTotalPrice) {
    await wait(500);
    elTotalProducts = document.getElementById('total-products');
    elTotalPrice = document.getElementById('total-price');
  }

  if (elTotalProducts && elTotalPrice) {
    elTotalPrice.textContent = cart.getTotalPriceWithFormat();
    elTotalProducts.textContent = String(cart.getTotalQuantity());
  }
}