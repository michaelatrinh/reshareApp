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
  justify-content: center;
`;

const InputUI = styled.TextInput`
  flex: 1;
  background-color: #ddd;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-height: 50px;
  text-align: center;
  margin: 10px 0;
`;

const ButtonUI = styled.Button`
  flex: 1;
  background-color: #ddd;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 50px;
  text-align: center;
  margin: 10px 0;
`;

export default function CustomerSignup({ route, navigation }) {
  //parameter from previous route i.e. login screen
  const { uid, email } = route.params;
  const currentUser = useContext(AuthContext);

  //display states
  const [displayName, setDisplayName] = useState("");
  const [displayLocation, setDisplayLocation] = useState("");
  const [displayType, setDisplayType] = useState("");

  //input states
  const [inputName, setInputName] = useState("");
  const [inputLocation, setInputLocation] = useState("");

  //firebase signout and return to login page
  const handleSignOut = async () => {
    try {
      auth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  //firebase read user data (name, location, type)
  function readUserData(userId) {
    const nameRef = ref(db, "users/" + userId + "/username");
    const locationRef = ref(db, "users/" + userId + "/location");
    const typeRef = ref(db, "users/" + userId + "/type");

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
  }

  //read user data on mount
  useEffect(() => {
    readUserData(uid);
  }, []);

  //firebase update user data (name, location, type)
  const handleUpdateInfo = async () => {
    await update(ref(db, "users/" + uid), {
      type: "customer",
      email: email,
      location: inputLocation,
      username: inputName,
    });

    navigation.navigate("Customer", {
      uid: currentUser.uid,
      email: currentUser.email,
    });
  };

  console.log(currentUser);

  return (
    <ContainerUI>
      <ButtonUI title="Sign Out" onPress={handleSignOut} />
      <Text>Hello {displayName}</Text>
      <Text>Your Location: {displayLocation}</Text>
      <Text>User Type: {displayType}</Text>
      <InputUI placeholder="name" onChangeText={(text) => setInputName(text)} />

      <InputUI
        placeholder="location"
        onChangeText={(text) => setInputLocation(text)}
      />

      <ButtonUI title="Update Info" onPress={handleUpdateInfo} />
    </ContainerUI>
  );
}
