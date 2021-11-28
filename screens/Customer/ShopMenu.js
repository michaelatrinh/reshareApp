import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";
import ItemCard from "../../comps/Customer/ItemCard";
import shopImage from "../../assets/store-img.png";
import { Image } from "react-native";
import MenuFilter from "../../comps/Customer/MenuFilter";
import { CartProvider } from "../../comps/cart";
import { CartContext } from "../../comps/cart";
import CartButton from "../../comps/Customer/CartButton";
import Header from "../../comps/Customer/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocationContext } from "../../comps/location";
import Geocode from "react-geocode";
import axios from "axios";
import getDistance from "../../comps/getDistance";

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

  const { cartTotal, setCartTotal, cart, setCart, addItemToCart } =
    useContext(CartContext);

  const [selection, setSelection] = useState("all");

  // filter menu
  const filterMenu = (menu) => {
    if (selection === "all") {
      return menu;
    } else {
      return menu.filter((item) => item.type === selection);
    }
  };

  const { currentAddress, curLng, curLat } = useContext(LocationContext);

  const [lng, setLong] = useState(null);
  const [lat, setLat] = useState(null);
  const [distance, setDistance] = useState(null);

  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey("AIzaSyBKDzfaPIYxv1yBdca_ldICCqRT_zTUqZY");

  // set response language. Defaults to english.
  Geocode.setLanguage("en");

  // Get latitude & longitude from address.
  Geocode.fromAddress(store.address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setLong(lng);
      setLat(lat);
    },
    (error) => {
      console.error(error);
    }
  );

  console.log(lng);
  console.log(lat);

  var config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${curLat}%2C${curLng}&destinations=${lat}%2C${lng}&key=AIzaSyBKDzfaPIYxv1yBdca_ldICCqRT_zTUqZY`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(response.data.rows[0].elements[0].distance.text);

      const distance = response.data.rows[0].elements[0].distance.text;
      setDistance(distance);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <>
      <ScreenUI>
        <Header navigation={navigation} />
        <ContainerUI>
          <Image
            source={shopImage}
            style={{ width: "100%", height: 180, borderRadius: 15 }}
          />
          <TitleUI>
            {store.username} - {store.location}
          </TitleUI>
          <DetailsUI>{distance}</DetailsUI>
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
              filterMenu(store.menu).map((item) => (
                <ItemCard key={item.name} item={item} navigation={navigation} />
              ))}
          </ScrollView>
        </ContainerUI>
      </ScreenUI>

      <CartButton navigation={navigation} store={store} />
    </>
  );
}
