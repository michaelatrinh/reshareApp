import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import shopImage from "../../assets/store-img.png";
import { Image } from "react-native";

const StoreDetailsUI = styled.Text`
color: #FE5D5D;
`;

const DistanceUI = styled.Text`
font-size: 12px;
`;

const StoreContainerUI = styled.Pressable`
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin: 0 0 25px 0;
 
`;

const RowUI = styled.View`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  padding: 10px 20px;
`;

export default function ShopCard({
  heading = "Today's Recommendations!",
  displayStores,
  navigation,
  distance="0.5",
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
      <Image source={shopImage} style={{ width: "100%", height: 129, borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
      <RowUI>
        <StoreDetailsUI>{v.username}</StoreDetailsUI>
        <DistanceUI>{distance}km</DistanceUI>
      </RowUI>
    </StoreContainerUI>
  );
}
