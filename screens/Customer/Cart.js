import Header from "../../comps/Customer/Header";
import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";
import { CartContext } from "../../comps/cart";
import CartList from "../../comps/Customer/CartList";
import { Alert } from "react-native";

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
  margin: 15px 0;
`;

const CartCont = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Total = styled.Pressable`
  width: 100%;
  height: 37px;
  border: 0.5px solid #d3cdcd;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const OrderMore = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 100px;
  left: 5%;
  width: 90%;
`;
const OrderMoreText = styled.Text`
  font-weight: normal;
  font-family: Poppins;
  color: #ee9837;
  font-size: 14px;
`;
const Checkout = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 43px;
  background-color: #ee9837;
  border-radius: 10px;
  flex-direction: row;
  position: absolute;
  bottom: 25px;
  left: 5%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

  const { store } = route.params;

  const removeItem = (name) => {
    console.log(name);
    let updateCart = cart.filter((item) => {
      return item.name !== name;
    });

    setCart(updateCart);
  };

  const total = cartTotal.toFixed(2);

  const handleChekout = () => {
    if(cart.length > 0){
    navigation.navigate("Schedule", { store: store });
    } else {
      Alert.alert("Your cart is empty!")
    }
  };

  return (
    <>
      <ScreenUI>
        <Header navigation={navigation} />
        <ContainerUI>
          <Top>
            <TitleUI>Your Cart</TitleUI>

            <CartCont>
              {cart &&
                cart.map((item) => (
                  <CartList
                    key={item.name}
                    item={item}
                    removeItem={removeItem}
                  ></CartList>
                ))}
              <Total style={{ marginTop: 10 }}>
                <Text>{cart.length} items</Text>
                <Text>total ${total}</Text>
              </Total>
            </CartCont>
          </Top>
        </ContainerUI>
      </ScreenUI>

      <OrderMore onPress={() => navigation.goBack(null)}>
        <OrderMoreText>Order More</OrderMoreText>
      </OrderMore>
      <Checkout onPress={handleChekout}>
        <CheckoutText>SCHEDULE PICKUP</CheckoutText>
        <Price>
          <PriceText>${total}</PriceText>
        </Price>
      </Checkout>
    </>
  );
}
