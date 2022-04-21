import React, { useState, createContext, useContext } from 'react';

const Context = createContext({});

export const CartContext: React.FC = ({ children }) => {
  const [cart, setCart] = useState({});

  return <Context.Provider value={{ cart, setCart }}>{children}</Context.Provider>;
};

export const useCartContext = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(`useCartContext must be used within a CartContext`);
  }

  return context;
};
