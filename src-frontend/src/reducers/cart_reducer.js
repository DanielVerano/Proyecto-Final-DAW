import React from 'react'

const cart_reducer = (state, action) => {

  if (action.type === 'COUNT_CART_TOTALS') {
    const { total_items, total_amount } = state.cart.reduce((total, cartItem) => {
      const { amount, price } = cartItem;
      total.total_items += amount;
      total.total_amount += price * amount;
      return total;
    }, { total_items: 0, total_amount: 0 });
    return { ...state, total_items, total_amount }
  }

  if (action.type === 'ADD_TO_CART') {
    const { product, amount } = action.payload;
    const { _id } = product;
    // 1. Comprobar si el producto existe ya en el carrito
    let tempItem = state.cart.find((cartItem) => cartItem.id === _id);

    // 2. Si el item existe, recorremos el carrito y actualizamos su cantidad
    if (tempItem) {
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === _id) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) newAmount = cartItem.max;

          return { ...cartItem, amount: newAmount }
        }
        return cartItem;
      });
      return { ...state, cart: tempCart }
    } else {
      // 3. Si no existe, lo añadimos al carrito
      let newItem = {
        id: _id,
        name: product.name,
        amount,
        image: product.image,
        price: product.price,
        max: product.stock
      }

      return { ...state, cart: [...state.cart, newItem] }
    }
  }

  if (action.type === 'REMOVE_CART_ITEM') {
    let tempCart = state.cart.filter((item) => item.id !== action.payload);

    return { ...state, cart: tempCart }
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }

  throw new Error(`No matching action ${action.type}`);
}

export default cart_reducer