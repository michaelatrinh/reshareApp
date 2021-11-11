import { getAuth } from "@firebase/auth";
import React, { useEffect, useState, createContext } from "react";
import firebase from "../config/firebase";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartTotal, setCartTotal] = useState('asd');
  const [cart, setCart] = useState([]);

  const addItemToCart = (item) => {
    setCart([...cart, item])
  }
  
  return (
    <CartContext.Provider value={{ cartTotal, setCartTotal, cart, setCart, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};
