import React, { useEffect, useState, useRef, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import ItemImage from "../../assets/lime.png";
import { Image, View, Text, Pressable } from "react-native";

const OrderContainerUI = styled.Pressable`
  width: 100%;
  height: 100px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  border-top-width: 0.5px;
  border-color: #F1F1F1;
  background-color: white;
`;

const TextColumn = styled.View`
  /* display: flex; */
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

const Discount = styled.Text`
  color: #FE0000;
  font-family: "Poppins";
  margin-right: 20px;
`;

const PickUpTime = styled.Text`
  color: #C5C1C1;
  font-family: "Poppins";
  text-decoration: line-through;
`;


export default function ItemCard({ 
  navigation,
  onPress,
  
  Quantity = "2",
  Item = "Orange",
  grams = "100g - 120g",

  DiscountedPrice = "$3.74",
  OriginalPrice = "$7.74",

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

      >
        <Image source={ItemImage} style=
        {{ 
          width: 126, 
          height: 89, 
          marginLeft: 19, 
          marginTop: 6,
          marginRight: 13,
          marginBottom: 6
          }} />

        <TextColumn>
          <StoreText>{Quantity} {Item} ({grams})</StoreText>

        <TextRow>
          <Discount>{DiscountedPrice}</Discount>
          <PickUpTime>{OriginalPrice}</PickUpTime>
        </TextRow>

        </TextColumn>
        
      </OrderContainerUI>
    );
  }