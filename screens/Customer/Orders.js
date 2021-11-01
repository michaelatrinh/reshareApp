import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import styled from "styled-components/native";

const ScreenUI = styled.View`
  align-items: center;
  justify-content: flex-start;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  width: 90%;
`;

export default function Orders({ route, navigation }) {

  return (
    <ScreenUI>
      <ContainerUI>
        <Text>Orders</Text>
      </ContainerUI>
    </ScreenUI>
  );
}
