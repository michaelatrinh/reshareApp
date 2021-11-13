import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import { ScrollView, Text, View, Pressable, Alert } from "react-native";
import { CartContext } from "../cart";

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
  ${"" /* width: 128px; */}
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
  text-decoration: line-through;
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
  position: absolute;
  bottom: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const CartText = styled.Text`
  font-size: 12px;
  color: #ffffff;
`;

//test item
const sampleItem = {
  name: "apple",
  price: 550,
  expiry: "Oct 15",
  quantity: 1,
};

export default function MenuItemDetail({ navigation, item }) {
  const { cartTotal, setCartTotal, cart, setCart, addItemToCart } =
    useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  //format price to two decimal
  const price = item.price.toFixed(2);
  const priceOg = item.priceog.toFixed(2);

  //subtract quanity with min limit of 1
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

  //add to cart
  const handleAddToCart = (item) => {
    //item from menu
    let itemName = item.name;
    //item in cart
    let cartItem = cart.find((item) => item.name === itemName);

    console.log(cartItem);
    //check if cart includes item being added
    if (cart.includes(item)) {
      //increase quanity
      cartItem.quantity += quantity;
      //re-render cart
      setCart([...cart]);
      //back to menu
      navigation.goBack(null);
    } else {
      //item in cart
      item.quantity = quantity;
      addItemToCart(item);
      navigation.goBack(null);
    }
  };

  return (
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
      <ThirdCol>
        <AddToCart onPress={() => handleAddToCart(item)}>
          <CartText>ADD TO CART</CartText>
        </AddToCart>
      </ThirdCol>
    </Main>
  );
}
