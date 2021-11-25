import React, { useEffect, useState, useRef, useContext } from "react";
import * as ReactNative from "react-native";
import styled from "styled-components/native";
import MenuItemDetail from "../../comps/Customer/MenuItemDetail";
import ItemSlider from "../../comps/Customer/ItemSlider";
import { ScrollView, Text, View, Image } from "react-native";
import { signInWithEmailAndPassword } from "@firebase/auth";
import Header from "../../comps/Customer/Header";

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
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export default function MenuItem({ route, navigation }) {
  const { item } = route.params;

  return (
    <ContainerUI>
      <Header navigation={navigation} />
      <ItemSlider item={item}></ItemSlider>
      <BottomCol>
        <MenuItemDetail navigation={navigation} item={item} />
      </BottomCol>
    </ContainerUI>
  );
}
