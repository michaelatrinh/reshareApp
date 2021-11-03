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

//components
import Greeting from "../../comps/Greeting";


export default function StoreHomeScreen({ route, navigation }) {
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

  //read user data on mount
  useEffect(() => {
    readUserData(currentUser.uid);
  }, []);

  //firebase read user data (name, location, type)
  function readUserData(userId) {
    const nameRef = ref(db, "stores/" + userId + "/username");
    const locationRef = ref(db, "stores/" + userId + "/location");
    const typeRef = ref(db, "stores/" + userId + "/type");

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
  const handleUpdateInfo = () => {
    update(ref(db, "stores/" + uid ), {
      type: "store",
      email: email,
      location: inputLocation,
      username: inputName,
      menu: [
        {
          name: "Apple",
          price: "5.50",
          expiry: "11/20/21" 
        }
      ]
    });
  };

  const goToDashboard = (navigation) => {
    navigation.navigate(RestaurantDashboardScreen)
  }
  console.log(currentUser);

  return (
    <ScrollView 
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <ContainerUI>
        {/* <GoToDash title="Go To Dashboard" onPress={goToDashboard} /> */}
        <Greeting name={displayName}/>

        {/* <ButtonUI title="Sign Out" onPress={handleSignOut} />
        <Text>Hello {displayName}</Text>
        <Text>Your Location: {displayLocation}</Text>
        <Text>User Type: {displayType}</Text>
        <InputUI placeholder="name" onChangeText={(text) => setInputName(text)} />

        <InputUI
          placeholder="location"
          onChangeText={(text) => setInputLocation(text)}
        />

        <ButtonUI title="Update Info" onPress={handleUpdateInfo} /> */}
      </ContainerUI>
    </ScrollView>
  );
}


const GoToDash = styled.Button`
  flex: 1;
  background-color: #ddd;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 50px;
  text-align: center;
  margin: 10px 0;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
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
