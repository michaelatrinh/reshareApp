import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import { ScrollView, Image, View } from "react-native";
import lime from "../../assets/limenobg.png";

const Main = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40%;
`;
export default function ItemSlider() {
  return (
    // <ScrollView
    //   horizontal={true}
    //   showsHorizontalScrollIndicator={false}
    //   contentContainerStyle={{
    //     display: "flex",
    //     flexDirection: "row",
    //     marginBottom: 30,
    //     left: "5%",
    //   }}
    // ></ScrollView>
    <Main>
      <Image source={lime} style={{ width: 200, height: 100 }} />
    </Main>
  );
}
