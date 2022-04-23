import React, { useState, createContext, useContext, Dispatch } from 'react';

export type Cart = {
  [key: string]: any;
};

type cartContextType = {
  cart: Cart;
  setCart: Dispatch<Cart>;
};

const Context = createContext<cartContextType>({
  cart: {},
  setCart: () => null,
});

export const CartContext: React.FC = ({ children }) => {
  const [cart, setCart] = useState<Cart>({});

  return <Context.Provider value={{ cart, setCart }}>{children}</Context.Provider>;
};

export const useCartContext = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(`useCartContext must be used within a CartContext`);
  }

  return context;
};
