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
import ShopCard from "../../comps/Customer/ShopCard";
import BrowseSearch from "../../comps/Customer/BrowseSearch";

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  display: flex;
`;

export default function ShopBrowsing({ route, navigation }) {
  //display states
  const [displayName, setDisplayName] = useState("");
  const [displayLocation, setDisplayLocation] = useState("");
  const [displayType, setDisplayType] = useState("");
  const [displayStores, setDisplayStores] = useState("");

  //input states
  const [inputName, setInputName] = useState("");
  const [inputLocation, setInputLocation] = useState("");

  //get current user from auth context
  const { currentUser } = useContext(AuthContext);

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

  console.log(displayStores);
  console.log(currentUser.uid);
  return (
    <>
      <BrowseSearch />

      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "white",
          width: "100%",
          minHeight: "100%",
        }}
      >
        {Object.entries(displayStores).map(([key, v]) => {
          return <ShopCard key={key} v={v} navigation={navigation} />;
        })}
      </ScrollView>
    </>
  );
}
