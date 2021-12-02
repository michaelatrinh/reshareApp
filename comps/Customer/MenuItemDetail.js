import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { ScrollView, Text, View, Pressable, Alert, Image } from "react-native";
import { CartContext } from "../cart";
import ItemSlider from "./ItemSlider";

const Main = styled.ScrollView`
  display: flex;
  flex-direction: column;

  border: none;
  width: 100%;
  height: 100%;
  padding: 15px 5% 0px 5%;

`;

const TopCol = styled.View`
  display: flex;
  width: 100%;

  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 25px;
`;

const Quantity = styled.Text`
  font-size: 17px;
  color: #4da95d;
  margin: 0 0 30px 0;
 
`;

const Description = styled.Text`
  font-size: 12px;
 
  color: #656565;
  margin: 0 0 30px 0;
`;

const ExpiryDate = styled.Text`
  font-size: 16px;
  color: #656565;
  margin: 0 0 30px 0;
`;

const SecondCol = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin: 0 0 100px 0;

`;
const LeftRow = styled.View`
  display: flex;
`;

const QuantityFunction = styled.View`
  width: 105px;
  height: 35px;
  background-color: #c2d1d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
`;

const QuantityButton = styled.Pressable`
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  color: #e5e5e5;
`;

const RightRow = styled.View`
  display: flex;

  flex-direction: column;
`;

const RightRowTop = styled.View`
  display: flex;
  width: 100px;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 10px 0;
`;
const PriceText = styled.Text`
  color: #fe0000;
  font-size: 17px;
`;
const OriginalPriceText = styled.Text`
  color: #c5c1c1;
  font-size: 17px;
  text-decoration: line-through;
`;
const RightRowBottom = styled.View`
  display: flex;
  width: 100px;
  justify-content: flex-end;
  align-items: flex-end;
`;
const Save = styled.Text`
  font-size: 12px;
  color: #4da95d;
`;


//test item
const sampleItem = {
  name: "apple",
  price: 550,
  expiry: "Oct 15",
  quantity: 1,
};

export default function MenuItemDetail({ navigation, item, quantity, addQuantity, subtractQuantity}) {

  //format price to two decimal
  const price = item.price.toFixed(2);
  const priceOg = item.priceog.toFixed(2);

  return (
    <>
      <Main>
     
        <TopCol>
          <Title>{item.name}</Title>
          <Quantity>{item.weight}</Quantity>
          <Description>{item.description}</Description>
          <ExpiryDate>Best before {item.expiry}</ExpiryDate>
        </TopCol>
        <SecondCol>
          <LeftRow>
            <QuantityFunction>
              <QuantityButton onPress={subtractQuantity}>
                <Text>-</Text>
              </QuantityButton>
              <Text>{quantity}</Text>
              <QuantityButton onPress={addQuantity}>
                <Text>+</Text>
              </QuantityButton>
            </QuantityFunction>
          </LeftRow>
          <RightRow>
            <RightRowTop>
              <PriceText>${price}</PriceText>
              <OriginalPriceText>{priceOg}</OriginalPriceText>
            </RightRowTop>
            <RightRowBottom>
              <Save>you save 50%</Save>
            </RightRowBottom>
          </RightRow>
        </SecondCol>

      </Main>

    </>
  );
}
