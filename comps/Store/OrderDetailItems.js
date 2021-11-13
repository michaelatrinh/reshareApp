import React, { useState, useContext } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { useFonts } from "expo-font";

const ContainerUI = styled.View`
    flex-direction: row;
    margin-top: 20px;
    align-items: center;
`;

const Order = styled.View`
  flex:1; 
  align-items: center;
`

const OrderId = styled.Text`
  color: #7E7E7E;
  font-size: 11px;
`;

const Time = styled.View`
  flex:1;
  align-items: center;
`

const PickUpTime = styled.Text`
  color: #7E7E7E;
  font-size: 11px;
`;

const Status = styled.View`
  flex:1;
  align-items: center;
  justify-content: center;
`

const StatusBg = styled.View`
  width: 74px;
  height: 18px;
  background-color: ${props => props.bgcolor};
  border-radius: 5px;
  align-items: center;
`

const OrderStatus = styled.Text`
  color: ${props => props.txtcolor};
`;

export default function OrderDetailItems({
  orderId = "#10284",
  pickUpTime = "7:30pm oct 5th",
  orderStatus = "waiting",
  bgcolor = "#FFF7B2",
  txtcolor = "#986D00",
}) {

  return (
    <ContainerUI>
        <Order>
          <OrderId>{orderId}</OrderId>
        </Order>
        <Time>
          <PickUpTime>{pickUpTime}</PickUpTime>
        </Time>
        <Status>
          <StatusBg bgcolor={bgcolor}>
            <OrderStatus txtcolor={txtcolor}>{orderStatus}</OrderStatus>
          </StatusBg>
        </Status>
    </ContainerUI>
  );
}
