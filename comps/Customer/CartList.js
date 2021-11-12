import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Alert,
  Image,
  SectionList,
} from "react-native";
import lime from "../../assets/limenobg.png";
import { EvilIcons } from "@expo/vector-icons";

const Main = styled.View`
  width: 95%;
  height: 100px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 10px;
`;

const Left = styled.View`
  flex-basis: 30%;
  height: 70px;
`;

const Right = styled.View`
  flex-grow: 1;
  height: 70px;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 20px;
`;

const FirstRight = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 11px;
`;
const Quantity = styled.View`
  width: 47px;
  height: 17px;
  border: 1px solid #ee9837;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const QuantityButton = styled.Pressable`
  width: 18px;
  height: 35px;
  justify-content: center;
  align-items: center;
  color: #e5e5e5;
`;
const SecondRight = styled.View``;

const Expiry = styled.Text`
  font-size: 11px;
  color: #656565;
`;
const ThirdRight = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PriceDiv = styled.View`
  display: flex;
  flex-direction: row;
`;
const PriceText = styled.Text`
  color: #fe0000;
  font-size: 11px;
  padding-right: 20px;
`;
const OriginalPriceText = styled.Text`
  color: #c5c1c1;
  font-size: 11px;
  text-decoration: line-through;
`;
const Trash = styled.View`
  display: flex;
`;
export default function CartList() {
  const [quantity, setQuantity] = useState(1);

  const subtractQuantity = () => {
    if (quantity < 2) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };

  //add quantity with max limit of item quantity
  const addQuantity = () => {
    if (quantity >= item.quantity) {
      Alert.alert("Only " + item.quantity + " in stock!");
      return;
    } else {
      setQuantity(quantity + 1);
    }
  };
  return (
    <Main>
      <Left>
        <Image source={lime} style={{ width: 70, height: 70 }} />
      </Left>
      <Right>
        <FirstRight>
          <Title>Fresh Lime (500-700g)</Title>
          <Quantity>
            <QuantityButton onPress={subtractQuantity}>
              <Text style={{ fontSize: 10 }}>-</Text>
            </QuantityButton>
            <Text style={{ fontSize: 10 }}>{quantity}</Text>
            <QuantityButton onPress={addQuantity}>
              <Text style={{ fontSize: 10 }}>+</Text>
            </QuantityButton>
          </Quantity>
        </FirstRight>
        <SecondRight>
          <Expiry>Best Before Oct 15th</Expiry>
        </SecondRight>
        <ThirdRight>
          <PriceDiv>
            <PriceText>3.74</PriceText>
            <OriginalPriceText>7.74</OriginalPriceText>
          </PriceDiv>
          <Trash>
            <EvilIcons name="trash" size={18} color="black" />
          </Trash>
        </ThirdRight>
      </Right>
    </Main>
  );
}
