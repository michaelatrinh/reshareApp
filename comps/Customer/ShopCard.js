import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import shopImage from "../../assets/store-img.png";
import { Image, Pressable } from "react-native";
import { LocationContext } from "../location";
import Geocode from "react-geocode";
import axios from "axios";

const StoreDetailsUI = styled.Text`
  color: #fe5d5d;
`;

const DistanceUI = styled.Text`
  font-size: 12px;
`;

const StoreContainerUI = styled.Pressable`
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin: 0 0 25px 0;
`;

const RowUI = styled.View`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  padding: 10px 20px;
`;

export default function ShopCard({
  heading = "Today's Recommendations!",
  displayStores,
  navigation,
  store,
}) {
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
    <StoreContainerUI
      onPress={() => {
        navigation.navigate("Menu", {
          store: store,
        });
      }}
    >
      <Image
        source={{uri: store.img}}
        style={{
          width: "100%",
          height: 129,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      <RowUI>
        <StoreDetailsUI>
          {store.username} - {store.location}
        </StoreDetailsUI>
        <DistanceUI>{distance}</DistanceUI>
      </RowUI>
    </StoreContainerUI>
  );
}
