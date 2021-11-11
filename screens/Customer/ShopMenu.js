import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";
import ItemCard from "../../comps/Customer/ItemCard";
import shopImage from "../../assets/store-img.png";
import { Image } from "react-native";
import MenuFilter from "../../comps/Customer/MenuFilter";
import { loadStripe } from "@stripe/stripe-js";
import { CartProvider } from "../../comps/cart";
import { CartContext } from "../../comps/cart";

const ScreenUI = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  width: 90%;
  min-height: 100%;
`;

const TitleUI = styled.Text`
  font-weight: normal;
  font-family: Poppins;
  font-size: 22px;
  margin: 15px 0;
`;

const FilterTextUI = styled.Text`
  font-weight: normal;
  font-family: Poppins;
  font-size: 18px;
  margin: 10px 0;
`;

const DetailsUI = styled.Text`
  margin: 0 0 10px 0;
  font-size: 14px;
`;

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_live_51JFU6sHU3r8RBID1vSR7F4f2PxHXMCPyeqTgb7gEnOoEKoQSZwlYxjcsn4yGMfwSwzszVyJIIWkBr5twqcEyI7nw00qkETIETp"
    );
  }
  return stripePromise;
};

export default function ShopMenu({ route, navigation }) {
  const { store } = route.params;

  const [selection, setSelection] = useState("all");

  const { cartTotal, setCartTotal, cart, setCart, addItemToCart } = useContext(CartContext);

  return (
 
      <ScreenUI>
        <ContainerUI>
          <Image
            source={shopImage}
            style={{ width: "100%", height: 180, borderRadius: 15 }}
          />
          <TitleUI>
            {store.username} - {store.location}
          </TitleUI>
          <DetailsUI>0.5km</DetailsUI>
          <MenuFilter selection={selection} setSelection={setSelection} />

          <FilterTextUI>{selection}</FilterTextUI>

          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "white",
              width: "100%",
            }}
          >
            {store.menu &&
              store.menu.map((item) => (
                <ItemCard key={item.name} item={item} navigation={navigation} />
              ))}


          </ScrollView>
        </ContainerUI>
      </ScreenUI>

  );
}
