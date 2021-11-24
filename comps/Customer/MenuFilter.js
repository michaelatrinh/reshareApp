import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import ShopCardSmall from "./ShopCardSmall";
import { ScrollView, Text } from "react-native";
import lime from "../../assets/lime2.png";
import { Image } from "react-native";

const ContainerUI = styled.View`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RowUI = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 90%;
  margin: 10px 0;
`;

const TagUI = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  border-radius: 50px;
  height: 48px;
  width: 48px;
  overflow: hidden;
`;

const TagTextUI = styled.Text`
  font-family: Poppins;
  font-size: 10px;
  color: #ee9837;
`;

const SearchBarUI = styled.TextInput`
  border: 1px solid #000000;
  border-radius: 10px;
  width: 90%;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  width: 90%;
  text-align: center;
`;

export default function MenuFilter({
  selection,
  setSelection
}) {


  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <RowUI>
      <TagUI
        style={{
          opacity: selection == "all" ? 1 : 0.5,
        }}
        onPress={() => setSelection("all")}
      >
        <Image source={lime} style={{ width: 48, height: 48 }} />
      </TagUI>
      <TagUI
        style={{ opacity: selection == "fruits" ? 1 : 0.5 }}
        onPress={() => setSelection("fruits")}
      >
        <Image source={lime} style={{ width: 48, height: 48 }} />
      </TagUI>
      <TagUI
        style={{
          opacity: selection == "greens" ? 1 : 0.5,
        }}
        onPress={() => setSelection("greens")}
      >
        <Image source={lime} style={{ width: 48, height: 48 }} />
      </TagUI>
      <TagUI
        style={{
          opacity: selection == "dairy" ? 1 : 0.5,
        }}
        onPress={() => setSelection("dairy")}
      >
        <Image source={lime} style={{ width: 48, height: 48 }} />
      </TagUI>
      <TagUI
        style={{
          opacity: selection == "grains" ? 1 : 0.5,
        }}
        onPress={() => setSelection("grains")}
      >
        <Image source={lime} style={{ width: 48, height: 48 }} />
      </TagUI>
    </RowUI>
  );
}
