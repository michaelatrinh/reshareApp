import React, { useEffect, useState, useRef, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import ShopImage from "../../assets/store-img.png";
import { Image, View, Text, Pressable } from "react-native";

const OrderContainerUI = styled.Pressable`
  width: 95%;
  height: 100px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin-bottom: 10px;
`;

const TextColumn = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
  background-color: white;
  width: 52%;
  height: 80%;
`;

const StoreText = styled.Text`
 font-family: "Poppins";
  font-size: 13px;
  justify-content: flex-start;
  flex-grow:2 ;
`;

const ItemsOrderedText = styled.Text`
  font-family: "Poppins";
  color: #EE9837;
  font-size: 13px;
  justify-content: flex-start;
  flex-grow:2;
`;

const TextRow = styled.View`
  /* display: flex; */
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: white;
`;

const PickUpTime = styled.Text`
  color: #EE9837;
  font-family: "Poppins";
`;


export default function ItemCard({ 
  navigation,
  onPress,
  
  Store = "Superstore",
  Location = "Brentwood",
  ItemsOrdered = "3 items ordered",
  Time = "6:00 pm",
}) {

  // if font doesnt work show nothing
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

    return (
      <OrderContainerUI 
      onPress={onPress}
        // navigation.navigate("Menu", {
        //   store: v,
        // });
      
      >
        <Image source={ShopImage} style=
        {{ 
          width: 126, 
          height: 89, 
          marginLeft: 19, 
          marginTop: 6,
          marginRight: 13,
          marginBottom: 6
          }} />

        <TextColumn>
          <StoreText>{Store} - {Location}</StoreText>
          <ItemsOrderedText>{ItemsOrdered}</ItemsOrderedText>

        <TextRow>
          <Text>Pick up - </Text>
          <PickUpTime>{Time}</PickUpTime>
        </TextRow>

        </TextColumn>
        
      </OrderContainerUI>
    );
  }