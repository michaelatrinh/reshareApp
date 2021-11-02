import React, { useState, useContext } from "react";
import { Text } from "react-native";

import styled from "styled-components/native";

import { ref, onValue } from "firebase/database";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { AuthContext } from "../comps/auth";
import LoginCard from "../comps/LoginCard";

const ContainerUI = styled.View`
  flex: 1;
  background-color: #ee9837;
  align-items: center;
  justify-content: center;
`;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("juliantmayes@gmail.com");
  const [password, setPassword] = useState("Hello123!");

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
            navigation.navigate("Customer", {
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
      <LoginCard
        handleSignIn={handleSignIn}
        handleSignUp={handleSignUp}
        setEmail={setEmail}
        setPassword={setPassword}
        email={email}
        password={password}
      />
    </ContainerUI>
  );
}
