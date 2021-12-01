import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import shopImage from "../../assets/store-img.png";
import { Image, Pressable, TouchableHighlight, View } from "react-native";
import SkeletonCardSmall from "./SkeletonCardSmall";

const StoreContainerUI = styled.TouchableHighlight`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin: 10px 15px 0 0;
  padding: 2px;
  width: 220px;
`;

const StoreDetailsUI = styled.Text`
  padding: 10px;
`;

export default function RecommenedCard({
  heading = "Today's Recommendations!",
  displayStores,
  navigation,
  setImagesLoaded,
  imagesLoaded,
  v,
}) {

  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  handleImageLoad = () => {
    setImagesLoaded(imagesLoaded + 1);
  };

  return (
    <StoreContainerUI
      onPress={() => {
        navigation.navigate("Menu", {
          store: v,
        });
      }}
      activeOpacity={0.6}
      underlayColor="#FDE9C2"
    >
{/*       <>
        <Image
          onLoad={handleImageLoad}
          source={{uri: v.img}}
          style={{ width: '100%', height: 78, borderRadius: 5 }}
        />
        <StoreDetailsUI>
          
        </StoreDetailsUI>
      </> */}
    </StoreContainerUI>
  );
}
