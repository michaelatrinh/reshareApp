import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import { ScrollView, Text, View, Pressable } from "react-native";

const Main = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  height: 399px;
  padding: 20px;
`;

const TopCol = styled.View`
  display: flex;
  width: 100%;
  height: 215px;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 25px;
`;

const Quantity = styled.Text`
  font-size: 17px;
  color: #4da95d;
  margin-bottom: 20px;
`;

const Description = styled.Text`
  font-size: 12px;
  margin-bottom: 25px;
  color: #656565;
`;

const ExpiryDate = styled.Text`
  font-size: 16px;
  color: #656565;
`;

const SecondCol = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 76px;
  justify-content: space-between;
  padding-top: 15px;
`;
const LeftRow = styled.View`
  display: flex;
`;

const QuantityFunction = styled.View`
  width: 105px;
  height: 36px;
  background-color: #c2d1d9;
`;

const RightRow = styled.View`
  display: flex;
  width: 128px;
  height: 76px;
  flex-direction: column;
`;

const RightRowTop = styled.View`
  display: flex;
  width: 100px;
  flex-direction: row;
  justify-content: space-between;
  height: 20px;
`;
const PriceText = styled.Text`
  color: #fe0000;
  font-size: 17px;
`;
const OriginalPriceText = styled.Text`
  color: #c5c1c1;
  font-size: 17px;
`;
const RightRowBottom = styled.View`
  display: flex;
  width: 100px;
  justify-content: flex-end;
  align-items: flex-end;
  height: 20px;
`;
const Save = styled.Text`
  font-size: 12px;
  color: #4da95d;
`;

const ThirdCol = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 75px;
`;

const AddToCart = styled.Pressable`
  background-color: #4da95d;
  width: 100%;
  height: 43px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartText = styled.Text`
  font-size: 12px;
  color: #ffffff;
`;
export default function MenuItemDetail() {
  return (
    <Main>
      <TopCol>
        <Title>Fresh Lime</Title>
        <Quantity>1PC (100g - 120g)</Quantity>
        <Description>
          this is description about the ingredients ! Lorem Ipsum is simply
          dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s{" "}
        </Description>
        <ExpiryDate>Best before Oct 15th</ExpiryDate>
      </TopCol>
      <SecondCol>
        <LeftRow>
          <QuantityFunction></QuantityFunction>
        </LeftRow>
        <RightRow>
          <RightRowTop>
            <PriceText>$1.74</PriceText>
            <OriginalPriceText>3.74</OriginalPriceText>
          </RightRowTop>
          <RightRowBottom>
            <Save>you save 50%</Save>
          </RightRowBottom>
        </RightRow>
      </SecondCol>
      <ThirdCol>
        <AddToCart>
          <CartText>ADD TO CART</CartText>
        </AddToCart>
      </ThirdCol>
    </Main>
  );
}
