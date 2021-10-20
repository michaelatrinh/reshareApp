import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
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

const ContainerUI = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
`;

const InputUI = styled.TextInput`
  flex: 1;
  background-color: #ddd;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-height: 50px;
  text-align: center;
  margin: 10px 0;
`;

const GreetingUI = styled.Text`
  font-size: 32px;
  font-weight: bold;
  width: 90%;
  margin: 0 0 10px 0;
`;

const HeadingUI = styled.Text`
  font-size: 24px;
  font-weight: bold;
  width: 90%;
  margin: 0 0 10px 0;
`;

const DetailsUI = styled.Text`
  width: 90%;
  margin: 0 0 10px 0;
`;

const StoreDetailsUI = styled.Text``;

const StoreContainerUI = styled.Pressable`
  width: 90%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background: white;
  border: 3px solid black;
  border-radius: 10px;
  margin: 0 0 10px 0;
  padding: 25px;
`;

const ButtonUI = styled.Button`
  flex: 1;
  background-color: #ddd;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 50px;
  text-align: center;
  margin: 10px 0;
`;

export default function StoreMenu({ route, navigation }) {
  const { store } = route.params;
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
  return (
    <ContainerUI>
      <GreetingUI>Welcome to {store.username}</GreetingUI>
      <DetailsUI>Location: {store.location}</DetailsUI>
    </ContainerUI>
  );
}
