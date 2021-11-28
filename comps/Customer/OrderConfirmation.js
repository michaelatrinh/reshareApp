import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import { ScrollView, Text, View, Pressable, Alert } from "react-native";

const Main = styled.View`
  display: flex;
  width: 90%;
  flex-direction: column;
`;

const TextLine = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;
const Title = styled.Text`
  font-size: 14px;
  font-family: Poppins;
  font-weight: bold;
`;

const Left = styled.Text`
  font-size: 14px;
  font-family: Poppins;
  font-weight: bold;
  color: #ee9837;
`;
const Right = styled.Text`
  font-size: 14px;
  font-family: Poppins;
  width: 150px;
  text-align: right;
  margin: 5px 0;

`;
export default function OrderComfirmation({cartTotal, pickupTime, store, orderNumber}) {
  return (
    <Main>
      <TextLine>
        <Title>Order Summary</Title>
      </TextLine>
      <TextLine
        style={{
          borderBottomColor: "#ee9837",
          borderBottomWidth: 1,
        }}
      >
        <Left>Order Number</Left>
        <Right>#{orderNumber}</Right>
      </TextLine>
      <TextLine
        style={{
          borderBottomColor: "#ee9837",
          borderBottomWidth: 1,
        }}
      >
        <Left>Total</Left>
        <Right>${cartTotal}</Right>
      </TextLine>
      <TextLine
        style={{
          borderBottomColor: "#ee9837",
          borderBottomWidth: 1,
        }}
      >
        <Left>Pickup Time</Left>
        <Right>{pickupTime}</Right>
      </TextLine>
      <TextLine
        style={{
          borderBottomColor: "#ee9837",
          borderBottomWidth: 1,
        }}
      >
        <Left>Pickup Location</Left>
        <Right>{store.address}</Right>
      </TextLine>
    </Main>
  );
}
