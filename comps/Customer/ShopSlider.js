import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import ShopCardSmall from "./ShopCardSmall";

const ContainerUI = styled.View`
  font-family: "Poppins";
  font-size: 32;
  justify-content: flex-start;
`;

const RowUI = styled.View`
  flex-direction: row;
`;

const ScrollUI = styled.View`
  flex-direction: row;
`;

const HeadingUI = styled.Text`
  font-family: "Poppins";
  font-size: 16px;
  justify-content: flex-start;
`;

const ExpandUI = styled.Text`
  font-family: "Poppins";
  font-size: 10px;
  justify-content: flex-start;
`;

export default function ShopSlider({
  heading = "Today's Recommendations!",
  displayStores,
  navigation,
}) {
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ContainerUI>
      <RowUI>
        <HeadingUI>{heading}</HeadingUI>

        <ExpandUI
          onPress={() => {
            navigation.navigate("Browse", {});
          }}
        >
          {" "}
          See All
        </ExpandUI>
      </RowUI>

      <ScrollUI>
        {Object.entries(displayStores).map(([key, v]) => {
          return <ShopCardSmall index={key} v={v} navigation={navigation} />;
        })}
      </ScrollUI>
    </ContainerUI>
  );
}
