import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import shopImage from "../../assets/store-img.png";
import { Image, Pressable } from "react-native";

const StoreContainerUI = styled.Pressable`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin: 10px 15px 0 0;
  padding: 2px;
`;

const StoreDetailsUI = styled.Text`
  padding: 10px;
`;

export default function ShopCardSmall({
  heading = "Today's Recommendations!",
  displayStores,
  navigation,
  v,
}) {
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <StoreContainerUI
      onPress={() => {
        navigation.navigate("Menu", {
          store: v,
        });
      }}
    >
      <Image source={shopImage} style={{ width: 171, height: 78, borderRadius: 5 }} />
      <StoreDetailsUI>
        {v.username} -
        {v.location}
      </StoreDetailsUI>
    </StoreContainerUI>
  );
}
