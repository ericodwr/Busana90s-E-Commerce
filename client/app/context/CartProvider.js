'use client';

import { useContext, useReducer } from 'react';
import CartContext from './CartContext';
import CartReducer from './cartReducer';
import {
  ADD_TO_CART,
  CHANGE_SNAPSHOW,
  CHECKOUT,
  CLEAR,
  DECREASE,
  INCREASE,
  REMOVE_ITEM,
} from './cartTypes';

export const CartProvider = ({ children }) => {
  const initialState = {
    cartItems: [],
    snapShow: false,
  };

  // Reducer
  const [state, dispatch] = useReducer(CartReducer, initialState);

  //Function to handle when an item is added from the store into the Cart
  const addToCart = (payload) => {
    dispatch({ type: ADD_TO_CART, payload });
  };

  //Function to handle when an item that is in the cart is added again
  const increase = (payload) => {
    dispatch({ type: INCREASE, payload });
  };

  //Function to handle when an item is removed from the cart
  const decrease = (payload) => {
    dispatch({ type: DECREASE, payload });
  };

  //Function to remove an item from the cart
  const removeFromCart = (payload) => {
    dispatch({ type: REMOVE_ITEM, payload });
  };

  //Function to clear the cart
  const clearCart = () => {
    dispatch({ type: CLEAR });
  };

  //Function to handle when the user clicks the checkout button
  const handleCheckout = () => {
    dispatch({ type: CHECKOUT });
  };

  const changeSnapShow = (payload) => {
    dispatch({ type: CHANGE_SNAPSHOW, payload });
  };

  return (
    <CartContext.Provider
      value={{
        showCart: state.showCart,
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        handleCheckout,
        clearCart,
        ...state,
        changeSnapShow,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('UseCartContext must be used within a CartProvider');
  }
  return context;
}
