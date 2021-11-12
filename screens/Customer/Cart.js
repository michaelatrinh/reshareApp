import Header from "../../comps/Customer/Header";
import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";
import { CartContext } from "../../comps/cart";
import CartList from "../../comps/Customer/CartList";

const ScreenUI = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  width: 90%;
  min-height: 100%;
  display: flex;
  align-content: space-between;
`;

const TitleUI = styled.Text`
  font-weight: normal;
  font-family: Poppins;
  font-size: 20px;
  margin: 15px 0 10px 15px;
`;

const CartCont = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Total = styled.Pressable`
  width: 95%;
  height: 37px;
  border: 0.5px solid #d3cdcd;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const OrderMore = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OrderMoreText = styled.Text`
  font-weight: normal;
  font-family: Poppins;
  color: #ee9837;
  font-size: 14px;
`;

const ButtonCont = styled.View``;
export default function Cart({ route, navigation }) {
  const { cartTotal, setCartTotal, cart, setCart, addItemToCart } =
    useContext(CartContext);

  return (
    <ScreenUI>
      <Header navigation={navigation} />
      <ContainerUI>
        <TitleUI>Your Cart</TitleUI>
        {/* {cart &&
          cart.map((item) => (
            <View key={item.name}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Text>{item.expiry}</Text>
              <Text>{item.quantity}</Text>
            </View>
          ))} */}
        <CartCont>
          <CartList></CartList>
          <CartList></CartList>
          <CartList></CartList>
          <Total>
            <Text>3 items</Text>
            <Text>total &11.22</Text>
          </Total>
        </CartCont>

        <OrderMore onPress={() => navigation.goBack(null)}>
          <OrderMoreText>Order More</OrderMoreText>
        </OrderMore>

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
