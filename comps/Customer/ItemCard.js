import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components/native";

const StoreDetailsUI = styled.Text``;

const StoreContainerUI = styled.Pressable`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background: white;
  border: 3px solid black;
  border-radius: 10px;
  margin: 0 0 10px 0;
  padding: 25px;
`;

export default function ItemCard({ route, navigation, item }) {
  return (
    <StoreContainerUI
      key={item.name}
      onPress={() => {
        navigation.navigate("Item", {
          item: item,
        });
      }}
    >
      <StoreDetailsUI>{item.name}</StoreDetailsUI>
      <StoreDetailsUI>{item.price}</StoreDetailsUI>
      <StoreDetailsUI>{item.expiry}</StoreDetailsUI>
    </StoreContainerUI>
  );
}
