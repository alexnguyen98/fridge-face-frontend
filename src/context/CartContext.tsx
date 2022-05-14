import React, { useState, createContext, useContext, Dispatch } from 'react';

export type Cart = {
  [id: string]: number;
};

export type Products = {
  [id: string]: any;
};

type cartContextType = {
  cart: Cart;
  setCart: Dispatch<Cart>;
  products: Products;
  setProducts: Dispatch<Products>;
};

const Context = createContext<cartContextType>({
  cart: {},
  setCart: () => null,
  products: [],
  setProducts: () => null,
});

export const CartContext: React.FC = ({ children }) => {
  const [cart, setCart] = useState<Cart>({});
  const [products, setProducts] = useState<Products>({});

  return <Context.Provider value={{ cart, setCart, products, setProducts }}>{children}</Context.Provider>;
};

export const useCartContext = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(`useCartContext must be used within a CartContext`);
  }

  return context;
};
