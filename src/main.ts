import './style.css';
import './navigation.ts';
import { Cart } from "./models/Cart.ts";
import { LocalStorage } from "./components/localStorage.ts";
import { getID } from "./components/getID.ts";
import { Product } from "./models/Product.ts";
import { CartItem } from "./models/CartItem.ts";
import { getCartItemHTML } from "./components/getCartItemHTML.ts";
import { setTotalProductsAndPrice } from "./components/setTotalProductsAndPrice.ts";

/**
 * Initialize the cart with the items stored in the local storage.
 */
const cart: Cart = LocalStorage.getCart()
const cartItemId = getID(cart.getItems().length);
const cartButton = document.getElementById('cart-button');
const elCartItems = document.getElementById('cart-items');

document.addEventListener('click', async (e: MouseEvent) => {
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
      if (elCartItems) {
        const item = elCartItems.querySelector(`.cart-item[data-id="${id}"]`);
        if (item) {
          item.remove();
        }
      }
      await setTotalProductsAndPrice();
    } else {
      const {name, price} = parentElement.dataset;
      const image = parentElement.querySelector('img')?.getAttribute('src');
      const id = cartItemId();
      const product = new Product(id, name, Number(price), image);
      const cartItem = new CartItem(id, product, 1);
      cart.addItem(cartItem);
      LocalStorage.setItem('cart', cart.getItems());
      parentElement.dataset.id = String(id);
      target.dataset.action = 'remove';
      target.classList.toggle('btn-remove-cart');
      target.textContent = 'Quitar del carrito';
      cartButton?.click();
      if (elCartItems) {
        elCartItems.insertAdjacentHTML('beforeend', getCartItemHTML(cartItem));
      }
      await setTotalProductsAndPrice();
    }
  }

  if (target.classList.contains('btn-remove-cart-item')) {
    const id = Number(target.parentElement?.dataset.id);
    cart.removeItem(id);
    LocalStorage.setItem('cart', cart.getItems());
    target.parentElement?.remove();
    const productCard = document.querySelector(`.product-card[data-id="${id}"]`) as HTMLElement;
    if (productCard) {
      productCard.dataset.id = '';
      const button = productCard.querySelector('button');
      if (button) {
        button.dataset.action = 'add';
        button.classList.toggle('btn-remove-cart');
        button.textContent = 'Añadir al carrito';
      }
    }
    await setTotalProductsAndPrice();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cartPanel = document.getElementById('cart-panel');
  const overlay = document.getElementById('overlay');

  const openCartPanel = () => {
    if (cartPanel && overlay) {
      cartPanel.style.right = '0';
      overlay.style.display = 'block';
    }
  }

  const closeCartPanel = () => {
    if (cartPanel && overlay) {
      cartPanel.style.right = '-350px';
      overlay.style.display = 'none';
    }
  }

  overlay?.addEventListener('click', closeCartPanel);

  cartButton?.addEventListener('click', () => {
    if (cartPanel) {
      const isPanelOpen = cartPanel.style.right === '0px';
      if (isPanelOpen) {
        closeCartPanel();
      } else {
        openCartPanel();
      }
    }
  });
});