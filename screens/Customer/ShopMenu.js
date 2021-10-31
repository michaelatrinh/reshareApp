import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { initializeApp } from "firebase/app";
import styled from "styled-components/native";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../comps/auth";
import ItemCard from "../../comps/Customer/ItemCard";
/* import { CartProvider, useShoppingCart } from "use-shopping-cart";
import Cart from "../../comps/Customer/Cart"; */

const ScreenUI = styled.View`
  align-items: center;
  justify-content: flex-start;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  width: 90%;
`;

const GreetingUI = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 10px 0;
`;

const DetailsUI = styled.Text`
  margin: 0 0 10px 0;
`;

export default function ShopMenu({ route, navigation }) {
  const { store } = route.params;

  return (
    /*     <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={
        "pk_test_51IZlClAcpIvk8gMGgBFvvoLwetyiSLp9PO9orIff7tK8ZAQWNBOA18e1jjAHDKh07COpuvHlQqd6rn0y4gbXEw1c00JYAkPfPy"
      }
      successUrl="stripe.com"
      cancelUrl="twitter.com/dayhaysoos"
      currency="USD"
      allowedCountries={["US", "GB", "CA"]}
      billingAddressCollection={true}
    > */

    <ScreenUI>
      <ContainerUI>
        <GreetingUI>Welcome to {store.username}</GreetingUI>
        <DetailsUI>Location: {store.location}</DetailsUI>

        {store.menu &&
          store.menu.map((item) => (
            <ItemCard item={item} navigation={navigation} />
          ))}
      </ContainerUI>
    </ScreenUI>
  );
}
