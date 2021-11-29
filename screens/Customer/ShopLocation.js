import React, { useEffect, useState, useRef, useContext } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import * as Location from "expo-location";
import Header from "../../comps/Customer/Header";
import axios from "axios";
import { AuthContext } from "../../comps/auth";
import Geocode from "react-geocode";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { db } from "../../config/firebase";
import { LocationContext } from "../../comps/location";
import MapViewDirections from "react-native-maps-directions";
import MapStoreCard from "../../comps/Customer/MapStoreCard";

export default function ShopLocation({ navigation, route }) {
  const [location, setLocation] = useState(null);
  const [mapRegion, setmapRegion] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);

  const currentUser = useContext(AuthContext);
  const uid = currentUser.currentUser.uid;

  const [stores, setStores] = useState(null);

  const { currentAddress, curLng, curLat } = useContext(LocationContext);

  const [destination, setDestination] = useState(null);

  const origin = { latitude: curLat, longitude: curLng };

  const GOOGLE_MAPS_APIKEY = "AIzaSyBKDzfaPIYxv1yBdca_ldICCqRT_zTUqZY";

  //firebase read user data (name, location, type)
  function readUserData() {
    const storeRef = ref(db, "stores/");

    onValue(storeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStores(data);
        /*      console.log(Object.values(data)); */
      }
    });
  }

  useEffect(() => {}, []);

  const [filteredStores, setFilteredStores] = useState([]);

  useEffect(() => {
    readUserData();

    setmapRegion({
      latitude: curLat,
      longitude: curLng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, []);

  if (mapRegion == null) {
    return <></>;
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.longitude);
  }

  if (currentAddress) {
    return (
      <View style={styles.container}>
        <Header navigation={navigation} />

        {/*         <Text>Your Location {currentAddress}</Text> */}
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          provider="google"
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}d
            strokeWidth={5}
            strokeColor="#EE9837"
          />
          {stores ? (
            Object.values(stores).map((store) => (
              <Marker
                onPress={() =>
                  setDestination({ latitude: store.lat, longitude: store.lng, name: store.username })
                }
                key={store.lat}
                coordinate={{
                  latitude: store.lat,
                  longitude: store.lng,
                }}
                pinColor="#57BA68" //set pin color
              >
{/*                 <Callout
                  onPress={() => navigation.navigate("Menu", { store: store })}
                >
                  <Text>Visit {store.username}</Text>
                </Callout> */}
              </Marker>
            ))
          ) : (
            <></>
          )}
        </MapView>

        <ScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center'}}>
          {stores ? (
            Object.values(stores).map((store) => (
              <MapStoreCard key={store.username} navigation={navigation} store={store} destination={destination} active={destination && destination.name === store.username ? true : false}/>
            ))
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.4,
  },
});
