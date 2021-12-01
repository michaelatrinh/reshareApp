import { getAuth } from "@firebase/auth";
import React, { useEffect, useState, createContext } from "react";
import firebase from "../config/firebase";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import styled from "styled-components/native";
import * as Location from "expo-location";
import axios from "axios";
import Geocode from "react-geocode";


// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyBKDzfaPIYxv1yBdca_ldICCqRT_zTUqZY");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [curLng, setCurLng] = useState(null)
  const [curLat, setCurLat] = useState(null)
  const [location, setLocation] = useState(null)
  const [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const result = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyBKDzfaPIYxv1yBdca_ldICCqRT_zTUqZY&radius=100`
      );

      // console.log(result.data.results[0]);
      const place = result.data.results.filter((o) => {
        return (
          o.types.indexOf("locality") == -1 &&
          o.types.indexOf("country") == -1 &&
          o.types.indexOf("sublocality") == -1
        );
      });

      console.log(place[0].vicinity);

      const currentAddress = place[0].vicinity;
      setCurrentAddress(currentAddress);

      // Get latitude & longitude from address.
      Geocode.fromAddress(currentAddress).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setCurLng(lng)
          setCurLat(lat)
        },
        (error) => {
          console.error(error);
        }
      );
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ currentAddress, curLng, curLat }}>
      {children}
    </LocationContext.Provider>
  );
};
