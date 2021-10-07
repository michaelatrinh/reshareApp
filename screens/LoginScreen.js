import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { initializeApp } from "firebase/app";
import styled from "styled-components/native";

import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";

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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //firebase sign in with email and password
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const typeRef = ref(db, "users/" + user.uid + "/type");

        onValue(typeRef, (snapshot) => {
          const data = snapshot.val();
          if (data == "store") {
            navigation.navigate("Store", {
              uid: user.uid,
              email: user.email,
            });
          } else {
            navigation.navigate("Home", {
              uid: user.uid,
              email: user.email,
            });
          }
        });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  //firebase sign up with email and password
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <ContainerUI>
      <Text></Text>
      <InputUI placeholder="email" onChangeText={(text) => setEmail(text)} />
      <InputUI
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
      />
      <ButtonUI title="Sign In" onPress={handleSignIn} />
      <ButtonUI title="Sign Up" onPress={handleSignUp} />
    </ContainerUI>
  );
}
