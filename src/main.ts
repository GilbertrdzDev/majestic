import './style.css';
import './navigation.ts';
import { Cart } from "./models/Cart.ts";
import { LocalStorage } from "./components/localStorage.ts";
import { getID } from "./components/getID.ts";
import { Product } from "./models/Product.ts";
import { CartItem } from "./models/CartItem.ts";

/**
 * Initialize the cart with the items stored in the local storage.
 */
const cart: Cart = LocalStorage.getCart()
const cartItemId = getID(cart.getItems().length);

document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('btn-add-cart')) {
    const {action} = target.dataset;

    if (!target.parentElement) return;

    const {parentElement} = target;

    if (action === 'remove') {
      const id = Number(parentElement.dataset.id);
      cart.removeItem(id);
      LocalStorage.setItem('cart', cart.getItems());
      target.dataset.action = 'add';
      target.classList.toggle('btn-remove-cart');
      target.textContent = 'Añadir al carrito';
      console.log(cart.getItems());
    } else {
      const {name, price} = parentElement.dataset;
      const id = cartItemId();
      const product = new Product(id, name, Number(price));
      cart.addItem(new CartItem(id, product, 1));
      LocalStorage.setItem('cart', cart.getItems());
      parentElement.dataset.id = String(id);
      target.dataset.action = 'remove';
      target.classList.toggle('btn-remove-cart');
      target.textContent = 'Quitar del carrito';
      console.log(cart.getItems());
    }
  }
});