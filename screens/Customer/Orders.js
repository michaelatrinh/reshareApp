import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";
import Header from "../../comps/Customer/Header";

//------ comps -------
import OrderCard from "../../comps/Customer/OrderCard";

const ScreenUI = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  width: 100%;
  height: 100%;
`;

const OrderCardContainer = styled.View`
  padding: 10px;
`;

const OrdersUI = styled.Text`
  margin: 0 0 10px 10px;
  font-family: "Poppins";
  font-size: 22px;
  justify-content: flex-start;
`;

const PastOrdersUI = styled.Text`
  margin: 50px 0 10px 10px;
  font-family: "Poppins";
  font-size: 22px;
  justify-content: flex-start;
`;



export default function Orders({ route, navigation }) {
  

  return (
    <ScreenUI>
      <Header navigation={navigation}/>
      
      <ScrollView showsVerticalScrollIndicator={false}>
      <ContainerUI>

        <OrdersUI>Current Orders</OrdersUI>

        <OrderCardContainer>
          <OrderCard onPress={() => navigation.navigate("Orders Summary")}/>
          <OrderCard onPress={() => navigation.navigate("Orders Summary")}/>
        </OrderCardContainer>
          
        <PastOrdersUI>Past Orders</PastOrdersUI>

        <OrderCardContainer>
          <OrderCard onPress={() => navigation.navigate("Orders Summary")}/>
          <OrderCard onPress={() => navigation.navigate("Orders Summary")}/>
          <OrderCard onPress={() => navigation.navigate("Orders Summary")}/>
        </OrderCardContainer>


      </ContainerUI>
      </ScrollView>
    </ScreenUI>
  );
}