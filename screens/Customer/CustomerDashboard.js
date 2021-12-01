import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { initializeApp } from "firebase/app";
import styled from "styled-components/native";

import { getDatabase, ref, onValue, set, update } from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../comps/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Greeting from "../../comps/Greeting";
import ShopSlider from "../../comps/Customer/ShopSlider";
import Header from "../../comps/Customer/Header";
import { LocationContext } from "../../comps/location";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const MapButtonUI = styled.Pressable`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: white;
  width: 100%;
  margin: 30px 0;
  justify-content: center;
  align-items: center;
`;

const UserDetailsUI = styled.Text`
  display: flex;
`;

export default function CustomerDashboard({ route, navigation }) {
  //display states
  const [displayName, setDisplayName] = useState("");
  const [displayLocation, setDisplayLocation] = useState("");
  const [displayType, setDisplayType] = useState("");
  const [displayStores, setDisplayStores] = useState("");

  //input states
  const [inputName, setInputName] = useState("");
  const [inputLocation, setInputLocation] = useState("");

  const [navLocation, setNavLocation] = useState("home");

  //get current user from auth context
  const { currentUser } = useContext(AuthContext);

  const { currentAddress, lng, lat } = useContext(LocationContext);

  //read user data on mount
  useEffect(() => {
    readUserData(currentUser.uid);
  }, []);

  //firebase read user data (name, location, type)
  function readUserData(userId) {
    const nameRef = ref(db, "users/" + userId + "/username");
    const locationRef = ref(db, "users/" + userId + "/location");
    const typeRef = ref(db, "users/" + userId + "/type");
    const storesRef = ref(db, "stores/");

    onValue(nameRef, (snapshot) => {
      const data = snapshot.val();
      setDisplayName(data);
    });

    onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      setDisplayLocation(data);
    });

    onValue(typeRef, (snapshot) => {
      const data = snapshot.val();
      setDisplayType(data);
    });

    onValue(storesRef, (snapshot) => {
      const data = snapshot.val();
      setDisplayStores(data);
    });
  }

  //firebase update user data (name, location, type)
  const handleUpdateInfo = () => {
    update(ref(db, "users/" + uid), {
      email: email,
      location: inputLocation,
      username: inputName,
    });
  };

  return (
    <>
      <Header navigation={navigation} back={false} />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "white",
          minHeight: "100%",
        }}
      >
        <ContainerUI>
          <Greeting name={displayName} />

          <MapButtonUI
            onPress={() => {
              navigation.navigate("Map");
            }}
          >
            <UserDetailsUI style={{marginRight: 10}}>
              <Feather name="map-pin" size={24} style={{ color: "#EE9837" }} />
            </UserDetailsUI>

            <UserDetailsUI>
              {currentAddress}
            </UserDetailsUI>
          </MapButtonUI>

          <ShopSlider
            displayStores={displayStores}
            heading="Stores you love!"
            navigation={navigation}
          />
          <ShopSlider
            displayStores={displayStores}
            heading="Stores near you!"
            navigation={navigation}
          />
          <ShopSlider
            displayStores={displayStores}
            heading="Today’s recommendations!"
            navigation={navigation}
          />
        </ContainerUI>
      </ScrollView>
    </>
  );
}
