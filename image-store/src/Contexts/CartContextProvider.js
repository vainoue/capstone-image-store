import React, { createContext, useState } from 'react';

// Create the cart context
export const CartContext = createContext();

// CartContextProvider component
const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const updateCart = (addedImage) => {
    setCart((prevCart) => [...prevCart, addedImage]);
  };

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
