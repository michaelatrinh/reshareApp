import React, { useEffect, useState, useRef, useContext } from "react";
import { Text, View, Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";
import { CartContext } from "../../comps/cart";
import Header from "../../comps/Customer/Header";

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
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  margin: 15px 0;
`;

export default function OrderConfirmation({ route, navigation }) {
  const { cartTotal, setCartTotal, cart, setCart, addItemToCart } =
    useContext(CartContext);

  return (
    <ScreenUI>
      <Header navigation={navigation} />
      <ContainerUI>
        <TitleUI>Thank you! Your order has successfully been placed</TitleUI>
        <Text>Order Summary</Text>

        <Pressable
          style={{ position: "absolute", bottom: 100 }}
          onPress={() => navigation.navigate("Confirmation")}
        >
          <Text>GET DIRECTIONS</Text>
        </Pressable>
      </ContainerUI>
    </ScreenUI>
  );
}
