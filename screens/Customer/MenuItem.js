import React, { useEffect, useState, useRef, useContext } from "react";
import * as ReactNative from 'react-native';
import styled from "styled-components/native";
import MenuItemDetail from "../../comps/Customer/MenuItemDetail";
import ItemSlider from "../../comps/Customer/ItemSlider";
import { ScrollView, Text, View, Image } from "react-native";
import { signInWithEmailAndPassword } from "@firebase/auth";

const ContainerUI = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #dfefb9;
`;
const BottomCol = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default function MenuItem({ route, navigation }) {
  const { item } = route.params;

  return (
    <ContainerUI>

      <ItemSlider></ItemSlider>
      <BottomCol>
        <MenuItemDetail />
      </BottomCol>

    </ContainerUI>
  );
}
