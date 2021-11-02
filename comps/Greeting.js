import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";

const GreetingUI = styled.Text`
  font-family: "Poppins";
  font-size: 32px;
  justify-content: flex-start;
  left: 5%;
`;

export default function Greeting({ name = "Juhee" }) {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GreetingUI>
      Hi,{"\n"}
      {name} 👋
    </GreetingUI>
  );
}
