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
`;

const Top = styled.View`
  display: flex;
  flex-direction: column;
  height: 63%;
`;

const Bottom = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;
const TitleUI = styled.Text`
  display: flex;
  justify-content: flex-start;
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
const Checkout = styled.Pressable`
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 40px;
  background-color: #ee9837;
  border-radius: 10px;
  flex-direction: row;
  margin-top: 21px;
`;

const CheckoutText = styled.Text`
  font-size: 11px;
  color: #ffffff;
  justify-content: center;
  margin-left: 40px;
`;

const Price = styled.View`
  width: 46px;
  height: 21px;
  background-color: #fde9c2;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

const PriceText = styled.Text`
  font-family: Poppins;
  font-size: 10px;
  color: #9b9b9b;
`;
const ButtonCont = styled.View``;
export default function Cart({ route, navigation }) {
  const { cartTotal, setCartTotal, cart, setCart, addItemToCart } =
    useContext(CartContext);

  return (
    <ScreenUI>
      <Header navigation={navigation} />
      <ContainerUI>
        <Top>
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
            <Total style={{ marginTop: 10 }}>
              <Text>3 items</Text>
              <Text>total $11.22</Text>
            </Total>
          </CartCont>
        </Top>
        <Bottom>
          <OrderMore onPress={() => navigation.goBack(null)}>
            <OrderMoreText>Order More</OrderMoreText>
          </OrderMore>

          <Checkout onPress={() => navigation.navigate("Confirmation")}>
            <CheckoutText>PROCEED TO CHECKOUT</CheckoutText>
            <Price>
              <PriceText>$11.22</PriceText>
            </Price>
          </Checkout>
          
        </Bottom>
      </ContainerUI>
    </ScreenUI>
  );
}
