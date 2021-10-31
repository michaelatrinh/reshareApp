import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { initializeApp } from "firebase/app";
import styled from "styled-components/native";

import { CartProvider, useShoppingCart } from "use-shopping-cart";

const ContainerUI = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
`;

const InputUI = styled.TextInput`
  flex: 1;
  background-color: #ddd;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-height: 50px;
  text-align: center;
  margin: 10px 0;
`;

const GreetingUI = styled.Text`
  font-size: 32px;
  font-weight: bold;
  width: 90%;
  margin: 0 0 10px 0;
`;

const HeadingUI = styled.Text`
  font-size: 24px;
  font-weight: bold;
  width: 90%;
  margin: 0 0 10px 0;
`;

const DetailsUI = styled.Text`
  width: 90%;
  margin: 0 0 10px 0;
`;

const StoreDetailsUI = styled.Text``;

const StoreContainerUI = styled.Pressable`
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background: white;
  border: 3px solid black;
  border-radius: 10px;
  margin: 0 0 10px 0;
  padding: 25px;
`;

const ButtonUI = styled.Button`
  flex: 1;
  background-color: #ddd;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 50px;
  text-align: center;
  margin: 10px 0;
`;

export default function Cart({}) {
  const { totalPrice, redirectToCheckout, cartCount } = useShoppingCart();

  return <div>{cartCount}</div>;
}
