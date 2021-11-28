import React, { useEffect, useState, useRef, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import ShopImage from "../../assets/store-img.png";
import { Image, View, Text, Pressable } from "react-native";

const OrderContainerUI = styled.Pressable`
  width: 90%;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
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
  flex-grow: 2;
`;

const ItemsOrderedText = styled.Text`
  font-family: "Poppins";
  color: #ee9837;
  font-size: 13px;
  justify-content: flex-start;
  flex-grow: 2;
`;

const TextRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: white;
`;

const PickUpTime = styled.Text`
  color: #ee9837;
  font-family: "Poppins";
`;

export default function ItemCard({
  navigation,
  order,
  store = "Superstore",
  location = "Metrotown",
  itemsOrdered = 3,
  time = "6:00 pm",
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
      onPress={() => navigation.navigate("Orders Summary", { order: order })}
    >
      <Image
        source={ShopImage}
        style={{
          width: 126,
          height: 95,
          marginLeft: 2.5,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      />

      <TextColumn>
        <StoreText>
          {store} - {location}
        </StoreText>
        <ItemsOrderedText>
          {itemsOrdered} Item{itemsOrdered > 1 ? "s" : ""} Ordered
        </ItemsOrderedText>

        <TextRow>
          <Text>Pick up - </Text>
          <PickUpTime>{time}</PickUpTime>
        </TextRow>
      </TextColumn>
    </OrderContainerUI>
  );
}
