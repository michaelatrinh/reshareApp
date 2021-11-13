import React, { useEffect, useState, useRef, useContext } from "react";
import { Text, View, Pressable, ScrollView, Image } from "react-native";
import styled from "styled-components/native";
import { CartContext } from "../../comps/cart";
import Header from "../../comps/Customer/Header";
import OrderComfirmation from "../../comps/Customer/OrderConfirmation";
import Map from "../../assets/map.png";

const ScreenUI = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: center;
  width: 90%;
  min-height: 100%;
`;

const TitleUI = styled.Text`
  font-family: Poppins;
  font-size: 18px;
  line-height: 24px;
  width: 250px;
  text-align: center;
  margin: 15px 0 40px 0;
`;

const GetDirection = styled.Pressable`
  width: 90%;
  height: 40px;
  border-radius: 5px;
  background-color: #ee9837;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 10px;
`;
const MapCont = styled.Image`
  width: 100%;
  height: 251px;
  margin: 10% 0;
`;
export default function OrderConfirmation({ route, navigation }) {
  const { cartTotal, setCartTotal, cart, setCart, addItemToCart } =
    useContext(CartContext);

  return (
    <ScreenUI>
      <Header navigation={navigation} />
      <ContainerUI>
        <TitleUI>Thank you! Your order has successfully been placed.</TitleUI>
        <OrderComfirmation></OrderComfirmation>

        <MapCont source={Map} style={{ width: 375, height: 250 }}></MapCont>
        <GetDirection onPress={() => navigation.navigate("Confirmation")}>
          <ButtonText>GET DIRECTIONS</ButtonText>
        </GetDirection>
      </ContainerUI>
    </ScreenUI>
  );
}
