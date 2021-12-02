import React, { useEffect, useState, useRef, useContext } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import MenuItemDetail from "../../comps/Customer/MenuItemDetail";
import ItemSlider from "../../comps/Customer/ItemSlider";
import { ScrollView, Text, View, Image } from "react-native";
import { signInWithEmailAndPassword } from "@firebase/auth";
import Header from "../../comps/Customer/Header";
import { CartContext } from "../../comps/cart";

const ContainerUI = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: #dfefb9;
`;
const BottomCol = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
`;

const AddToCart = styled.TouchableOpacity`
  background-color: #4da95d;
  width: 90%;
  height: 43px;
  position: absolute;
  bottom: 25px;
  left: 5%;
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

export default function MenuItem({ route, navigation }) {
  const { item } = route.params;

  const { cartTotal, setCartTotal, cart, setCart, addItemToCart } =
  useContext(CartContext);


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

  const [quantity, setQuantity] = useState(1);

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

  return (
    <>
      <Header navigation={navigation} />
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          source={{ uri: item.img }}
          style={{ width: "100%", height: '50%' }}
        />
        <MenuItemDetail navigation={navigation} item={item} quantity={quantity} subtractQuantity={subtractQuantity} addQuantity={addQuantity} />

        <AddToCart onPress={() => handleAddToCart(item)}>
          <CartText>ADD TO CART</CartText>
        </AddToCart>
      </SafeAreaView>
    </>
  );
}
