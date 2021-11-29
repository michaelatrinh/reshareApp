import React, { useState, useContext } from "react";
import { Text, Pressable } from "react-native";
import styled from "styled-components/native";
import { useFonts } from "expo-font";

const ContainerUI = styled.Pressable`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 25px;
`;

const Order = styled.View`
  align-items: center;
`;

const OrderId = styled.Text`
  color: #7e7e7e;
  font-size: 11px;
  width: 45px;
  background-color: aliceblue;
`;

const Time = styled.View`
  align-items: center;
`;

const PickUpTime = styled.Text`
  color: #7e7e7e;
  font-size: 11px;
`;

const Status = styled.View`
  align-items: center;
  justify-content: center;
`;

const StatusBg = styled.View`
  width: 74px;
  height: 18px;
  background-color: ${(props) => props.bgcolor};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const OrderStatus = styled.Text`
  font-family: "Poppins";
  font-size: 10px;
  color: ${(props) => props.txtcolor};
`;

export default function OrderDetailItems({

  orderId = "#10284",
  pickUpTime = "7:30pm oct 5th",
  orderStatus = "waiting",
  bgcolor = "#FFF7B2",
  txtcolor = "#986D00",
  onPress,
  order
}) {


  return (
    <ContainerUI onPress={onPress}>
      <Order>
        <OrderId>{order.number}</OrderId>
      </Order>
      <Time>
        <PickUpTime>{order.pickupTime}</PickUpTime>
      </Time>
      <Status>
        <StatusBg bgcolor={bgcolor}>
          <OrderStatus txtcolor={txtcolor}>{orderStatus}</OrderStatus>
        </StatusBg>
      </Status>
    </ContainerUI>
  );
}
