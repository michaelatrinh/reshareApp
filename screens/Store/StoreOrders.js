import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from 'react';
import * as ReactNative from "react-native";
import styled from "styled-components/native";

import { initializeApp } from "@firebase/app";

import { getDatabase, ref, onValue, set } from "@firebase/database";
import {
    getAuth,
    onAuthStateChanged,
    FacebookAuthProvider,
    signInWithCredential,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    produce, //may cause errors -Michael
} from "firebase/auth";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";

//compontents
import Greeting from "../../comps/Greeting";



export default function StoreDashboardScreen({
    navigation,
}){
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

  console.log(displayStores);
  console.log(currentUser.uid);

  const [emptyPage, setEmptyPage] = React.useState(true);

  const addItems = () => {
      navigation.navigate("AddItemsCamera");
  }

  if(emptyPage === true){
      return (
        <ReactNative.ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <ContainerUI>
            <Greeting name={displayName} />
            <ReactNative.Text>You do not have any ingredients added.</ReactNative.Text>
            <AddItemsButton title="Add Items" onPress={addItems} />
          </ContainerUI>
        </ReactNative.ScrollView>
      );
  }

  return (
    <ReactNative.ScrollView
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <ContainerUI>
        <Greeting name={displayName} />
        <ReactNative.Text>You do not have any ingredients added.</ReactNative.Text>
        <AddItemsButton title="Add Items" onPress={addItems} />
      </ContainerUI>
    </ReactNative.ScrollView>
  );
}

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const AddItemsButton = styled.Button`
    flex: 1;
    background-color: #ddd;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 50px;
    text-align: center;
    margin: 10px 0;
`;