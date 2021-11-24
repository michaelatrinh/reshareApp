import React, { useEffect, useState, useRef, useContext } from "react";
import { Text, View, Pressable, ScrollView, Image, TouchableHighlight } from "react-native";
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
  position: absolute;
  bottom: 25px;
  left: 5%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

    const { cartTotal } = route.params;

  return (

    <>
    <ScreenUI>
      <Header navigation={navigation} />
      <ContainerUI>
        <TitleUI>Thank you! Your order has successfully been placed.</TitleUI>
        <OrderComfirmation cartTotal={cartTotal}/>

        <MapCont source={Map} style={{ width: 375, height: 250 }}></MapCont>

      </ContainerUI>
    </ScreenUI>
    <GetDirection onPress={() => navigation.navigate("Map")}>
          <ButtonText>GET DIRECTIONS</ButtonText>
        </GetDirection>

    </>
  );
}
