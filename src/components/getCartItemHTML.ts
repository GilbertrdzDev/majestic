import { CartItem } from "../models/CartItem.ts";
import { toFormatCurrency } from "./toFormatCurrency.ts";

export const getCartItemHTML = (cartItem: CartItem) => {
  return `
    <div class="cart-item" data-id="${cartItem.id}">
      <div class="cart-item__info">
        <div class="cart-item__image">
          <img src="${cartItem.product.image}" alt="${cartItem.product.name}">
        </div>
        <div class="cart-item__details">
          <h3 class="cart-item__name">${cartItem.product.name}</h3>
          <p class="cart-item__price">$${toFormatCurrency({value: cartItem.product.price})}</p>
        </div>
      </div>
      <button class="btn-remove-cart-item" data-action="remove">Quitar</button>
    </div>
  `;
}