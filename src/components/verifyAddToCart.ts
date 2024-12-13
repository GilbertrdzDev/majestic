import { Cart } from "../models/Cart.ts";
import { LocalStorage } from "./localStorage.ts";
import { getCartItemHTML } from "./getCartItemHTML.ts";
import { setTotalProductsAndPrice } from "./setTotalProductsAndPrice.ts";

export const verifyAddToCart = () => {
  const cart: Cart = LocalStorage.getCart()
  const cartItems = cart.getItems();
  const countItems = cartItems.length;
  const elCartItems = document.getElementById('cart-items');

  if (countItems > 0) {
    const products: NodeListOf<HTMLElement> = document.querySelectorAll('.product-card');
    products.forEach((product) => {
      const {name, price} = product.dataset;
      const cartItem = cartItems.find((item) => {
        return item.product.name === name && item.product.price === Number(price);
      });
      if (cartItem) {
        product.dataset.id = String(cartItem.id);
        const button = product.querySelector('button');
        if (button) {
          button.textContent = 'Quitar del carrito';
          button.dataset.action = 'remove';
          button.classList.toggle('btn-remove-cart');
        }
      }
    });

    if (elCartItems) {
      elCartItems.innerHTML = cartItems.map((item) => getCartItemHTML(item)).join('');
    }

    setTotalProductsAndPrice();
  }
}