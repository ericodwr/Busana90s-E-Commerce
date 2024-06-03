'use client';

import React from 'react';
import { useCartContext } from '../context/CartProvider';
import { toast, Bounce } from 'react-toastify';
import { showToast } from '../utils/toastHelper';

const AddToCartButton = ({ product }) => {
  const { addToCart, cartItems } = useCartContext();

  return (
    <button
      className="bg-primary text-white w-full h-[6vh] rounded-lg hover:bg-secondary"
      onClick={() => {
        addToCart(product);
        if (cartItems.find((item) => item.id === product.id)) {
          showToast('error', 'Product already added in the cart!');
        } else {
          showToast('success', 'Successfully Add Product to Cart!');
        }
      }}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
