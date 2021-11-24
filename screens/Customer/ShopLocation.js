import React, { useEffect, useState, useRef, useContext } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import styled from "styled-components/native";
import * as Location from "expo-location";
import Header from "../../comps/Customer/Header";
import axios from 'axios';

export default function ShopLocation({navigation}) {
  const [location, setLocation] = useState(null);
  const [mapRegion, setmapRegion] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pin, setPin] = useState({
    latitude: 49.2242082,
    longitude: -123.0007442,
  });
  const [shopName, setShopName] = useState(null);
  const [shopLocationLat, setshopLocationLat] = useState(null);
  const [shopLocationLng, setshopLocationLng] = useState(null);

  const [shopName2, setShopName2] = useState(null);
  const [shopLocationLat2, setshopLocationLat2] = useState(null);
  const [shopLocationLng2, setshopLocationLng2] = useState(null);

  const [shopName3, setShopName3] = useState(null);
  const [shopLocationLat3, setshopLocationLat3] = useState(null);
  const [shopLocationLng3, setshopLocationLng3] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const result = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyCskif9uGFwZC2aLhtt6KX4mPGkR4TWLq8&radius=100`);
      // console.log(result.data.results[0]);
      const place = result.data.results.filter((o)=>{
        return (
          o.types.indexOf("locality")== -1 &&
          o.types.indexOf("country")== -1 &&
          o.types.indexOf("sublocality")== -1
        )
        });
      const currentAddress = place[0].vicinity;
      setCurrentAddress(currentAddress);

      const shopResult = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyCskif9uGFwZC2aLhtt6KX4mPGkR4TWLq8&radius=2000&type=supermarket`);
      const shopName = shopResult.data.results[0].name;
      setShopName(shopName);
      const shopLocationLat = shopResult.data.results[0].geometry.location.lat;
      setshopLocationLat(shopLocationLat);
      const shopLocationLng = shopResult.data.results[0].geometry.location.lng;
      setshopLocationLng(shopLocationLng);
      
      const shopName2 = shopResult.data.results[1].name;
      setShopName2(shopName2);
      const shopLocationLat2 = shopResult.data.results[1].geometry.location.lat;
      setshopLocationLat2(shopLocationLat2);
      const shopLocationLng2 = shopResult.data.results[1].geometry.location.lng;
      setshopLocationLng2(shopLocationLng2);

      const shopName3 = shopResult.data.results[2].name;
      setShopName3(shopName3);
      const shopLocationLat3 = shopResult.data.results[2].geometry.location.lat;
      setshopLocationLat3(shopLocationLat3);
      const shopLocationLng3 = shopResult.data.results[2].geometry.location.lng;
      setshopLocationLng3(shopLocationLng3);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.03,
      });
    })();
  }, []);

  if (mapRegion == null){
    return <></>
  } 

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.longitude);
  }

  let place = currentAddress;

  return (
    <View style={styles.container}>
           <Header navigation={navigation}/>
      <MapView 
      style={styles.map} 
      initialRegion={mapRegion} 
      provider="google"
      showsUserLocation={true}
      showsMyLocationButton={true}
      >
        <Marker
          coordinate={pin}
          pinColor="red" //set pin color
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>

        {/* <Circle center={pin} radius={2000} /> */}

        <Marker
          coordinate={{
            latitude: shopLocationLat,
            longitude: shopLocationLng,
          }}
          pinColor="purple" //set pin color
        >
          <Callout>
            <Text>{shopName}</Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{
            latitude: shopLocationLat2,
            longitude: shopLocationLng2,
          }}
          pinColor="purple" //set pin color
        >
          <Callout>
            <Text>{shopName2}</Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{
            latitude: shopLocationLat3,
            longitude: shopLocationLng3,
          }}
          pinColor="purple" //set pin color
        >
          <Callout>
            <Text>{shopName3}</Text>
          </Callout>
        </Marker>
      </MapView>

      <Text>{place}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
});
