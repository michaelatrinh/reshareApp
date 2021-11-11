import React, { useEffect, useState, useRef, useContext } from "react";
import MapView, { Callout, Circle, Marker,} from 'react-native-maps';
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import styled from "styled-components/native";
import * as Location from "expo-location";

const store = {
  one:{
    title: "Real Canadian Superstore",
    available_food: "Egg",
    location:{
      latitude: 49.22773104046109,
      longitude: -123.00165238253575,
    }
  },

  two:{
    title: "Save-On-Foods",
    available_food: "Potato",
    location:{
      latitude: 49.23137702816943, 
      longitude: -123.00460512979869,
    }
  },

  three:{
    title: "PriceSmart Foods",
    available_food: "tomato",
    location:{
      latitude: 49.22909036799708, 
      longitude: -123.00198803216809,
    }
  },
  
}

export default function ShopLocation({}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [pin, setPin] = useState ({
    latitude: 49.2242082,
    longitude: -123.0007442,
  });

  const [mapRegion, setmapRegion] = useState({
    latitude: 49.2242082,
    longitude: -123.0007442,
    latitudeDelta: 0.01,
    longitudeDelta: 0.03,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })

      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
      
    })();
  }, []);

  // useEffect(()=>{
  //   setPin({
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //   })
  // },[location])

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.longitude);
  }

  return (
    <View style={styles.container}>

        <MapView style={styles.map}
         initialRegion={mapRegion}
          provider="google" 
        >
  
          <Marker coordinate={pin}
            pinColor = "red" //set pin color
          >
            <Callout>   
              <Text>I'm here</Text>
            </Callout>
          </Marker>
      
          <Circle center={pin}
            radius={1000} />
  
          <Marker coordinate={store.one.location}
            pinColor = "purple" //set pin color
          >
            <Callout>   
              <Text>{store.one.title}</Text>
            </Callout>
          </Marker>
  
          <Marker coordinate={store.two.location}
            pinColor = "purple" //set pin color
          >
            <Callout>   
              <Text>{store.two.title}</Text>
            </Callout>
          </Marker>
  
          <Marker coordinate={store.three.location}
            pinColor = "purple" //set pin color
          >
            <Callout>   
              <Text>{store.three.title}</Text>
            </Callout>
          </Marker>
  
        </MapView>
        
      </View >
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1
  },

});