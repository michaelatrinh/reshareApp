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
  height: 100px;
`;

const ItemContainerUI = styled.TouchableHighlight`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  flex-direction: row;
  display: flex;
  margin: 0 0 25px 0;
`;

const ItemNameUI = styled.Text`
  font-size: 14px;
`;

const ItemPriceUI = styled.Text`
  color: #fe0000;
`;

const ItemPriceOgUI = styled.Text`
  color: #c5c1c1;
  font-size: 14px;
  text-decoration: line-through;
`;

const ItemExpiryUI = styled.Text`
  font-size: 12px;
  color: #ee9837;
`;

const RowUI = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
`;

export default function ItemCard({ route, navigation, item }) {
  const price = item.price.toFixed(2);
  const priceOg = item.priceog.toFixed(2);

  return (
    <ItemContainerUI
      key={item.name}
      onPress={() => {
        navigation.navigate("Item", {
          item: item,
        });
      }}
      activeOpacity={0.6}
      underlayColor="#FDE9C2"
    >
      <>
        <Image source={lime} style={{ width: 171, height: 100 }} />

        <ItemDeatilsUI>
          <ItemNameUI>{item.name}</ItemNameUI>
          <RowUI>
            <ItemPriceUI>${price}</ItemPriceUI>
            <ItemPriceOgUI>${priceOg}</ItemPriceOgUI>
          </RowUI>

          <ItemExpiryUI>Best Before {item.expiry}</ItemExpiryUI>
        </ItemDeatilsUI>
      </>
    </ItemContainerUI>
  );
}
