import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components/native";
import lime from "../../assets/lime.png";
import { Image } from "react-native";

const ItemDeatilsUI = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0 0 20px;
  flex: 1;
  height: 100;
`;

const ItemContainerUI = styled.Pressable`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  flex-direction: row;
  display: flex;
`;

const ItemNameUI = styled.Text`
  font-size: 14px;
`;

const ItemPriceUI = styled.Text`
  color: #fe0000;
`;

const ItemExpiryUI = styled.Text`
  font-size: 12px;
  color: #ee9837;
`;

export default function ItemCard({ route, navigation, item }) {
  return (
    <ItemContainerUI
      key={item.name}
      onPress={() => {
        navigation.navigate("Item", {
          item: item,
        });
      }}
    >
      <Image source={lime} style={{ width: 171, height: 100 }} />

      <ItemDeatilsUI>
        <ItemNameUI>{item.name}</ItemNameUI>
        <ItemPriceUI>{item.price}</ItemPriceUI>
        <ItemExpiryUI>Best Before {item.expiry}</ItemExpiryUI>
      </ItemDeatilsUI>
    </ItemContainerUI>
  );
}
