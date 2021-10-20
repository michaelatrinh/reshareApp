import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from "react";
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
import { AuthContext } from "../comps/auth";

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
  width: 90%;
  max-height: 50px;
  text-align: center;
  margin: 10px 0;
`;

const ButtonContainerUI = styled.View`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 50px;
  background-color: aliceblue;
`;

const ButtonUI = styled.Pressable`
  background-color: #000000;
  color: white;
  width: 90%;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 50px;
  margin: 10px 0;
`;

const ButtonTextUI = styled.Text`
  color: white;
`;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

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

      <ButtonUI onPress={handleSignIn}>
        <ButtonTextUI>Sign In</ButtonTextUI>
      </ButtonUI>
      <ButtonUI onPress={handleSignUp}>
        <ButtonTextUI>Sign Up</ButtonTextUI>
      </ButtonUI>
    </ContainerUI>
  );
}
