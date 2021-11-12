import Header from "../../comps/Customer/Header";
import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";
import { CartContext } from "../../comps/cart";

const ScreenUI = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  width: 90%;
  min-height: 100%;
`;

const TitleUI = styled.Text`
  font-weight: normal;
  font-family: Poppins;
  font-size: 22px;
  margin: 15px 0;
`;

export default function Cart({ route, navigation }) {
  const { cartTotal, setCartTotal, cart, setCart, addItemToCart } =
    useContext(CartContext);

  return (
    <ScreenUI>
      <Header navigation={navigation} />
      <ContainerUI>
        <TitleUI>Your Cart</TitleUI>
        {cart &&
          cart.map((item) => (
            <View key={item.name}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Text>{item.expiry}</Text>
              <Text>{item.quantity}</Text>
            </View>
          ))}
        <Pressable onPress={() => navigation.goBack(null)}>
          <Text>Order More</Text>
        </Pressable>

        <Pressable
          style={{ position: "absolute", bottom: 250 }}
          onPress={() => navigation.navigate("Confirmation")}
        >
          <Text>PROCEED TO CHECKOUT</Text>
        </Pressable>
      </ContainerUI>
    </ScreenUI>
  );
}
