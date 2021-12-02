import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView} from "react-native";
import { initializeApp } from "firebase/app";
import styled from "styled-components/native";

import { getDatabase, ref, onValue, set, update } from "firebase/database";

import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../comps/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Greeting from "../../comps/Greeting";
import ShopSlider from "../../comps/Customer/ShopSlider";
import Header from "../../comps/Customer/Header";
import { LocationContext } from "../../comps/location";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import RecommenedSlider from "../../comps/Customer/RecommenedSlider";

const Tab = createBottomTabNavigator();

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const MapButtonUI = styled.Pressable`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: white;
  width: 100%;
  margin: 30px 0;
  justify-content: center;
  align-items: center;
`;

const UserDetailsUI = styled.Text`
  display: flex;
`;

export default function CustomerDashboard({ route, navigation }) {
  //display states
  const [displayName, setDisplayName] = useState("");
  const [displayStores, setDisplayStores] = useState("");
  const [savedStores, setSavedStores] = useState("");


  //get current user from auth context
  const { currentUser } = useContext(AuthContext);

  //get address from location context
  const { currentAddress, curLng, curLat } = useContext(LocationContext);

  //read user data on mount
  useEffect(() => {
    readUserData(currentUser.uid);
  }, []);

  const [filteredStores, setFilteredStores] = useState("");

  useEffect(() => {
    const filtered = Object.values(displayStores).sort(function (a, b) {
      return a.distance - b.distance;
    });
    setFilteredStores(filtered);
  }, [displayStores]);



  //firebase read user data (name, location, type)
  async function readUserData(userId) {
    const nameRef = ref(db, "users/" + userId + "/username");
    const storesRef = ref(db, "stores/");
    const savedRef = ref(db, "users/" + userId + "/saved");

    onValue(nameRef, (snapshot) => {
      const data = snapshot.val();
      setDisplayName(data);
    });

    onValue(storesRef, (snapshot) => {
      const data = snapshot.val();
      setDisplayStores(data);
    });

    onValue(savedRef, (snapshot) => {
      const data = snapshot.val();
      setSavedStores(data);
    });
  }


  let filteredSavedStores = Object.keys(displayStores)
  .filter(key => savedStores && savedStores.includes(key))
  .reduce((obj, key) => {
    obj[key] = displayStores[key];
    return obj;
  }, {});  
  

  /*   const [storeArr, setStoreArr] = useState([]);

  const getDistance = async (stores) => {
    for (var i = 0; i < Object.values(stores).length; i++) {
      let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${curLat}%2C${curLng}&destinations=${
        Object.values(stores)[i].lat
      }%2C${
        Object.values(stores)[i].lng
      }&key=AIzaSyBKDzfaPIYxv1yBdca_ldICCqRT_zTUqZY`;

      var config = {
        method: "get",
        url: url,
        headers: {},
      };

      const curStore = Object.values(stores)[i];
      let arr = [];

      await axios(config)
        .then(function (response) {
          const distance = response.data.rows[0].elements[0].distance.text;
          curStore.distance = distance;
          console.log(distance)
          arr.push(curStore);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }; */

  return (
    <>
      <Header navigation={navigation} back={false} />
      <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "white",
          minHeight: "100%",
        }}
      >

        <ContainerUI>
          <Greeting name={displayName} />

          <MapButtonUI
            onPress={() => {
              navigation.navigate("Map");
            }}
          >
            <UserDetailsUI style={{ marginRight: 10 }}>
              <Feather name="map-pin" size={24} style={{ color: "#EE9837" }} />
            </UserDetailsUI>

            <UserDetailsUI>{currentAddress}</UserDetailsUI>
          </MapButtonUI>


          <ShopSlider
            displayStores={filteredStores && filteredStores}
            heading="Stores near you!"
            navigation={navigation}
          />
          <ShopSlider
            displayStores={displayStores && displayStores}
            heading="Today’s recommendations!"
            navigation={navigation}
          />
                    <ShopSlider
            displayStores={displayStores && filteredSavedStores}
            heading="Stores you love!"
            navigation={navigation}
          />
        </ContainerUI>
      </ScrollView>
      </SafeAreaView>
    </>
  );
}
