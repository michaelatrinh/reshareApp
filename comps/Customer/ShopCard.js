import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";

const StoreDetailsUI = styled.Text``;

const StoreContainerUI = styled.Pressable`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background: white;
  border: 3px solid black;
  border-radius: 10px;
  margin: 0 0 10px 0;
  padding: 25px;
`;

export default function ShopCard({
  heading = "Today's Recommendations!",
  displayStores,
  navigation,
  v,
  key,
}) {
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <StoreContainerUI
      key={key}
      onPress={() => {
        navigation.navigate("Menu", {
          store: v,
        });
      }}
    >
      <StoreDetailsUI>{v.username}</StoreDetailsUI>
      <StoreDetailsUI>{v.location}</StoreDetailsUI>
    </StoreContainerUI>
  );
}
