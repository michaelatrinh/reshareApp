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
  const [email, setEmail] = useState("julianmayes@gmail.com");
  const [password, setPassword] = useState("Hello123!");

  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createAccountError, setCreateAccountError] = useState("");

  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  //firebase sign in with email and password
  const handleSignIn = (myEmail, myPassword) => {
    signInWithEmailAndPassword(auth, myEmail, myPassword)
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
          } else if (data == "customer") {
            navigation.navigate("Customer", {
              uid: user.uid,
              email: user.email,
            });
          } else {
            navigation.navigate("Sign Up", {
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
    if (createPassword === confirmPassword) {
      createUserWithEmailAndPassword(auth, createEmail, createPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
          console.log("account created");
          setCreateAccountError("account created");
          handleSignIn(createEmail, createPassword);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          // ..
        });
    } else {
      console.log("passwords don't match");
      setCreateAccountError("passwords don't match");
    }
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
        setCreateEmail={setCreateEmail}
        setCreatePassword={setCreatePassword}
        setConfirmPassword={setConfirmPassword}
        createAccountError={createAccountError}
        createEmail={createEmail}
        createPassword={createPassword}
      />
    </ContainerUI>
  );
}
