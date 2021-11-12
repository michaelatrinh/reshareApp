import { getAuth } from "@firebase/auth";
import React, { useEffect, useState, createContext } from "react";
import firebase from "../config/firebase";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);

  //add item to cart
  const addItemToCart = (item) => {
    setCart([...cart, item]);
  };

  //cart total
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => (total += item.price * item.quantity));
    setCartTotal(total);
  }, [cart]);

  //cart count
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => (total += item.quantity));
    setCartCount(total);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cartTotal,
        setCartTotal,
        cart,
        setCart,
        addItemToCart,
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
