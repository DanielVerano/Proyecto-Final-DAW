import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/cart_reducer';

const CartContext = React.createContext();

const getCart = () => {
  let cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

const initialState = {
  cart: getCart(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 499
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    dispatch({ type: 'COUNT_CART_TOTALS' });
  }, [state.cart]);

  const addToCart = (product, amount) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, amount } });
  }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_CART_ITEM', payload: id });
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  }

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext);
}