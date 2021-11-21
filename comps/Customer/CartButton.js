import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { CartContext } from "../cart";

const AddToCartUI = styled.Pressable`
  font-family: Ubuntu;
  background-color: #4da95d;
  width: 90%;
  height: 43px;
  position: absolute;
  bottom: 25px;
  left: 5%;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartTextUI = styled.Text`
  font-size: 12px;
  color: #ffffff;
  position: relative;
`;

const CartCountUI = styled.Text`
  font-size: 12px;
  color: #ffffff;
  position: absolute;
  left: 14px;
`;

export default function CartButton({ navigation }) {
  const { cartTotal, setCartTotal, cart, setCart, addItemToCart, cartCount } =
    useContext(CartContext);

  // get total of all quanity values in cart
  const sumTotal = (cart) => cart.reduce((sum, { quantity }) => quantity, 0);

  return (
    <AddToCartUI
      onPress={() => {
        navigation.navigate("Cart");
      }}
    >
      <CartCountUI>{cartCount} Items</CartCountUI>
      <CartTextUI>SHOPPING CART</CartTextUI>
    </AddToCartUI>
  );
}
