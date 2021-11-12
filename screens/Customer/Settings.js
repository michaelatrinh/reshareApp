import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import styled from "styled-components/native";
import Header from "../../comps/Customer/Header";

const ScreenUI = styled.View`
  align-items: center;
  justify-content: flex-start;
`;

const ContainerUI = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
`;

export default function Settings({ route, navigation }) {
  return (
    <ScreenUI>
      <ContainerUI>
        <Text>Settings</Text>
      </ContainerUI>
    </ScreenUI>
  );
}
