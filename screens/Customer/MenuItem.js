import React, { useEffect, useState, useRef, useContext } from "react";
import * as ReactNative from 'react-native';
import styled from "styled-components/native";

const ContainerUI = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
`;

const StoreDetailsUI = styled.Text``;

export default function MenuItem({ route, navigation }) {
  const { item } = route.params;

  return (
    <ContainerUI>
      <StoreDetailsUI>{item.name}</StoreDetailsUI>
      <StoreDetailsUI>{item.price}</StoreDetailsUI>
      <StoreDetailsUI>{item.expiry}</StoreDetailsUI>
      <ReactNative.Text>Hello</ReactNative.Text>
    </ContainerUI>
  );
}
