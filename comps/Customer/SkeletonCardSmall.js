import React, { useState, useContext, useEffect, useRef } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import shopImage from "../../assets/store-img.png";
import { Image, Pressable, View, Animated } from "react-native";

const StoreContainerUI = styled.View`
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 5px;
  margin: 10px 15px 0 0;
  padding: 2px;
  width: 220px;

`;

const StoreImageUI = styled.View`
  background: lightgray;
  width: 100%;
`;

const StoreDetailsUI = styled.View`
  padding: 10px;
  background: lightgray;
  width: 100%;
  border-radius: 5px;
`;

export default function SkeletonCardSmall({}) {
  
  return (
    <StoreContainerUI>
      <StoreImageUI style={{ width: '100%', height: 78, borderRadius: 5}} />
      <StoreDetailsUI></StoreDetailsUI>
    </StoreContainerUI>
  );
}
