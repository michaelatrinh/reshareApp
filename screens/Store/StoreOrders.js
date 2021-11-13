import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from "react";
import * as ReactNative from "react-native";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";
import OrderDetailItems from "../../comps/Store/OrderDetailItems";
import Header from "../../comps/Customer/Header";

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

export default function StoreDashboardScreen({ navigation }) {
  // //display states
  // const [displayName, setDisplayName] = useState("");
  // const [displayLocation, setDisplayLocation] = useState("");
  // const [displayType, setDisplayType] = useState("");
  // const [displayStores, setDisplayStores] = useState("");

  // //input states
  // const [inputName, setInputName] = useState("");
  // const [inputLocation, setInputLocation] = useState("");

  // const [navLocation, setNavLocation] = useState("home");

  // //get current user from auth context
  // const { currentUser } = useContext(AuthContext);

  // //read user data on mount
  // useEffect(() => {
  //   readUserData(currentUser.uid);
  // }, []);

  // //firebase read user data (name, location, type)
  // function readUserData(userId) {
  //   const nameRef = ref(db, "users/" + userId + "/username");
  //   const locationRef = ref(db, "users/" + userId + "/location");
  //   const typeRef = ref(db, "users/" + userId + "/type");
  //   const storesRef = ref(db, "stores/");

  //   onValue(nameRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setDisplayName(data);
  //   });

  //   onValue(locationRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setDisplayLocation(data);
  //   });

  //   onValue(typeRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setDisplayType(data);
  //   });

  //   onValue(storesRef, (snapshot) => {
  //     const data = snapshot.val();
  //     setDisplayStores(data);
  //   });
  // }

  // //firebase update user data (name, location, type)
  // const handleUpdateInfo = () => {
  //   update(ref(db, "users/" + uid), {
  //     email: email,
  //     location: inputLocation,
  //     username: inputName,
  //   });
  // };

  // console.log(displayStores);
  // console.log(currentUser.uid);

  // PUT PAGE FRONT END CODE BELOW WITHIN "RETURN"
  return (
    <ScreenUI>

      <Header navigation={navigation}/>

    <ContainerUI>

      <TitleCont>
        <TitleUI>Order Details</TitleUI>
      </TitleCont>

      <Table>

        <TableTitle>
          <Text>Order ID</Text>
          <Text>Pickup Time</Text>
          <Text>Order Status</Text>
        </TableTitle>

        <OrderDetailItems onPress={() => navigation.navigate("Order Page")}></OrderDetailItems>
        <OrderDetailItems onPress={() => navigation.navigate("Order Page")}></OrderDetailItems>
        <OrderDetailItems onPress={() => navigation.navigate("Order Page")}></OrderDetailItems>
        <OrderDetailItems onPress={() => navigation.navigate("Order Page")}></OrderDetailItems>
        <OrderDetailItems onPress={() => navigation.navigate("Order Page")}></OrderDetailItems>
        <OrderDetailItems onPress={() => navigation.navigate("Order Page")}></OrderDetailItems>
        <OrderDetailItems onPress={() => navigation.navigate("Order Page")}></OrderDetailItems>

      </Table>

    </ContainerUI>
    </ScreenUI>
  );
}

const ScreenUI = styled.View`
  height: 100%;
  background-color: white;
  
`;

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100%;
`;

const TitleUI = styled.Text`
  justify-content: flex-start;
  font-weight: normal;
  font-family: "Poppins";
  font-size: 20px;
  margin: 15px 0 10px 15px;
`;

const TitleCont = styled.View`
  background-color: #fff;
  display: flex;
`;

const Table = styled.View`

`;

const TableTitle = styled.View`
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  border: 0.5px solid #c2d1d9;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  padding: 0 20px;
`;
