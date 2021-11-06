import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import styled from "styled-components/native";

//------ comps -------
import OrderCard from "../../comps/Customer/OrderCard";

const ScreenUI = styled.View`
  align-items: center;
  justify-content: flex-start;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const OrdersUI = styled.Text`
  margin: 0 0 10px 0;
  font-family: "Poppins";
  font-size: 22px;
  justify-content: flex-start;
  left: 5%;
`;

const PastOrdersUI = styled.Text`
  margin: 50px 0 10px 0;
  font-family: "Poppins";
  font-size: 22px;
  justify-content: flex-start;
  left: 5%;
`;



export default function Orders({ route, navigation }) {

  return (
    <ScreenUI>
      <ContainerUI>


        <OrdersUI>Current Orders</OrdersUI>

          <OrderCard/>
        
        <PastOrdersUI>Past Orders</PastOrdersUI>

        <OrderCard/>
        <OrderCard/>
        <OrderCard/>



      </ContainerUI>
    </ScreenUI>
  );
}
