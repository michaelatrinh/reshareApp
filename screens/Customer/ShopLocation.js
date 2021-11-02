import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import styled from "styled-components/native";
import * as Location from "expo-location";

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
`;

export default function ShopLocation({}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  //longitude
  console.log(location.coords.latitude);

  //latitude
  console.log(location.coords.longitude);

  return (
    <ContainerUI>
      <Text>{text}</Text>
    </ContainerUI>
  );
}
