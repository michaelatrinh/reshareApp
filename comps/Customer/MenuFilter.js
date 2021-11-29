import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import ShopCardSmall from "./ShopCardSmall";
import { ScrollView, Text } from "react-native";
import all from "../../assets/Categories/all.png";
import lime from "../../assets/Categories/lime.png";
import grain from "../../assets/Categories/grain.png";
import onion from "../../assets/Categories/onion.png";
import can from "../../assets/Categories/can.png";
import milk from "../../assets/Categories/milk.png";

import { Image } from "react-native";

const RowUI = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin: 20px 0;
`;

const TagUI = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50px;
  height: 40px;
  width: 40px;
  overflow: hidden;
`;

export default function MenuFilter({ selection, setSelection, win }) {
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <RowUI style={{ width: win.width * 0.9 }}>
      <TagUI
        style={{
          opacity: selection == "all" ? 1 : 0.5,
        }}
        onPress={() => setSelection("all")}
      >
        <Image source={all} style={{ width: 48, height: 48 }} />
      </TagUI>
      <TagUI
        style={{ opacity: selection == "fruits" ? 1 : 0.5 }}
        onPress={() => setSelection("fruits")}
      >
        <Image source={lime} style={{ width: 48, height: 48 }} />
      </TagUI>
      <TagUI
        style={{
          opacity: selection == "vegtables" ? 1 : 0.5,
        }}
        onPress={() => setSelection("vegtables")}
      >
        <Image source={onion} style={{ width: 48, height: 48 }} />
      </TagUI>
      <TagUI
        style={{
          opacity: selection == "dairy" ? 1 : 0.5,
        }}
        onPress={() => setSelection("dairy")}
      >
        <Image source={milk} style={{ width: 48, height: 48 }} />
      </TagUI>
      <TagUI
        style={{
          opacity: selection == "nuts" ? 1 : 0.5,
        }}
        onPress={() => setSelection("nuts")}
      >
        <Image source={grain} style={{ width: 48, height: 48 }} />
      </TagUI>

      <TagUI
        style={{
          opacity: selection == "canned" ? 1 : 0.5,
        }}
        onPress={() => setSelection("canned")}
      >
        <Image source={can} style={{ width: 48, height: 48 }} />
      </TagUI>
    </RowUI>
  );
}
