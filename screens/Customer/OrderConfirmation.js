import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";
import styled from "styled-components/native";
import { CartContext } from "../../comps/cart";
import Header from "../../comps/Customer/Header";
import OrderComfirmation from "../../comps/Customer/OrderConfirmation";
import Map from "../../assets/map.png";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { AuthContext } from "../../comps/auth";
import MapView, { Callout, Circle, Marker, Polyline } from "react-native-maps";
import { LocationContext } from "../../comps/location";
import MapViewDirections from "react-native-maps-directions";
import * as Linking from "expo-linking";

const ScreenUI = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;

const TitleUI = styled.Text`
  font-family: Poppins;
  font-size: 18px;
  line-height: 24px;
  width: 250px;
  text-align: center;
  margin: 15px 0 40px 0;
`;

const GetDirection = styled.TouchableOpacity`
  width: 90%;
  height: 40px;
  border-radius: 5px;
  background-color: #ee9837;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 25px;
  left: 5%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 10px;
`;
const MapCont = styled.Image`
  width: 100%;
  height: 251px;
  margin: 10% 0;
`;
export default function OrderConfirmation({ route, navigation }) {
  const { cart, cartTotal, pickupTime, store, orderNumber } = route.params;

  const { currentAddress, curLng, curLat } = useContext(LocationContext);

  useEffect(() => {}, []);

  const origin = { latitude: curLat, longitude: curLng };
  const destination = { latitude: store.lat, longitude: store.lng };
  const GOOGLE_MAPS_APIKEY = "AIzaSyBKDzfaPIYxv1yBdca_ldICCqRT_zTUqZY";

  const [mapRegion, setmapRegion] = useState(null);

  const [destinationRegion, setDestinationRegion] = useState(null);

  useEffect(() => {
    setmapRegion({
      latitude: curLat,
      longitude: curLng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  }, []);

  console.log(store.address.split(" ").join("+"));

  return (
    <>
      <ScreenUI>
        <Header navigation={navigation} />
        <ContainerUI>
          <TitleUI>Thank you! Your order has successfully been placed.</TitleUI>
          <OrderComfirmation
            cartTotal={cartTotal}
            pickupTime={pickupTime}
            store={store}
            orderNumber={orderNumber}
          />

          <MapView
            style={{ width: "90%", height: 250, marginTop: 25 }}
            initialRegion={mapRegion}
            provider="google"
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            <Marker
              key={store.lat}
              coordinate={{
                latitude: store.lat,
                longitude: store.lng,
              }}
              pinColor="#57BA68" //set pin color
            >
              <Callout
                onPress={() => navigation.navigate("Menu", { store: store })}
              >
                <Text>Visit {store.username}</Text>
              </Callout>
            </Marker>

            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="#EE9837"
            />
          </MapView>
          {/* <MapCont source={Map} style={{ width: 375, height: 250 }}></MapCont> */}
        </ContainerUI>
      </ScreenUI>
      <GetDirection
        onPress={() =>
          Linking.openURL(
            `https://www.google.com/maps/dir/${curLat},${curLng}/${store.address
              .split(" ")
              .join(
                "+"
              )}/@${curLat},${curLng},16z/data=!4m5!4m4!1m1!4e1!1m0!3e0`
          )
        }
      >
        <ButtonText>GET DIRECTIONS</ButtonText>
      </GetDirection>
    </>
  );
}
