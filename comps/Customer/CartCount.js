import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components/native";
import lime from "../../assets/lime.png";
import { Image } from "react-native";
import { useShoppingCart } from "use-shopping-cart";

const ItemDeatilsUI = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0 0 20px;
  flex: 1;
  height: 100px;
`;

const ItemContainerUI = styled.Pressable`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  flex-direction: row;
  display: flex;
`;

const ItemNameUI = styled.Text`
  font-size: 14px;
`;

const ItemPriceUI = styled.Text`
  color: #fe0000;
`;

const ItemExpiryUI = styled.Text`
  font-size: 12px;
  color: #ee9837;
`;

export default function CartCount({ route, navigation, item }) {
  const { totalPrice, redirectToCheckout, cartCount } = useShoppingCart();

  return <ItemNameUI>Your Cart has {cartCount} Items</ItemNameUI>;
}
