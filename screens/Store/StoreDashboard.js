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
import firebase, { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../comps/auth";

//compontents
import Greeting from "../../comps/Greeting";
import MyItemsHeader from "../../comps/Store/MyItemsHeader";
import MyItemsItem from "../../comps/Store/MyItemsItem";
import RemoveWindow from "../../comps/Store/RemoveItemConfirmation";

var deviceWidth = ReactNative.Dimensions.get('window').width; //full width
var deviceHeight = ReactNative.Dimensions.get('window').height; //full height

export default function StoreDashboardScreen({
    navigation,
}){
  //display states
  const [displayName, setDisplayName] = React.useState("");
  const [displayLocation, setDisplayLocation] = React.useState("");
  const [displayType, setDisplayType] = React.useState("");
  const [displayStores, setDisplayStores] = React.useState("");
  const [displayRemove, setDisplayRemove] = React.useState(false);
  const [displayGrey, setDisplayGrey] = React.useState(false);
  const [menu, setMenu] = React.useState([]);
  const [itemName, setItemName] = React.useState("");
  const [itemExpiry, setItemExpiry] = React.useState("");
  const [itemPrice, setItemPrice] = React.useState(0);

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
    const nameRef = ref(db, "stores/" + userId + "/username");
    const locationRef = ref(db, "stores/" + userId + "/location");
    const typeRef = ref(db, "stores/" + userId + "/type");
    const menuRef = ref(db, "stores/" + userId + "/menu");
    const itemRef = ref(db, "store/" + userId + "/menu" + []);
    const itemNameRef = ref(db, "store/" + userId + "/menu" + [] + "/name");
    const itemExpiryRef = ref(db, "store/" + userId + "/menu" + [] + "/expiry");
    const itemPriceRef = ref(db, "store/" + userId + "/menu" + [] + "/price");

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

    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      setDisplayStores(data);
    });
    
  }

  // firebase read store data (menu, itemNum, type)
  //
  //firebase update user data (name, location, type)
  const handleUpdateInfo = () => {
    update(ref(db, "users/" + uid), {
      email: email,
      location: inputLocation,
      username: inputName,
    });
  };

  // console.log(displayStores);
  // console.log(currentUser.uid);

  const [emptyPage, setEmptyPage] = React.useState(false);

  const addItems = () => {
    navigation.navigate("AddItemsCamera");
  }

  // Remove Item Window Display when remove btn is pressed
  var newRemoveWindowDisplay="none"
  // Grey background for when removal window pops up
  var newGreyDisplay="none";

  const removeItemBtnPress = () => {
    setDisplayRemove(true);
  }

  // when user pressed no on Removal confirmation window
  const handleNoPress = () => {
    setDisplayRemove(false);

  }

  // when user pressed yes on Removal confirmation window
  const handleYesPress = () => {
    setDisplayRemove(false);

    // will need to add code to identify which item to remove and how
    // @ @ @ @ @ @
  }

  if(displayRemove){
      newRemoveWindowDisplay="flex";
      newGreyDisplay="flex";
  }

  const handleAddButton = () => {
    navigation.navigate("Add Item Camera");
  }

  // ignore below if statement
  if(emptyPage === true){
      return (
        <ContainerUI>
          <TopContainer>
            <Greeting name={displayName} />

            <MyItemsHeader />
          </TopContainer>

          <ReactNative.ScrollView
            contentContainerStyle={styles.foodListScrollNothing}
          >
            
            <ReactNative.Text>You do not have any ingredients added.</ReactNative.Text>
            <AddItemsButton title="Add Items" onPress={addItems} />
          </ReactNative.ScrollView>

        </ContainerUI>
      );
  }

  return (
    <ContainerUI>
      <GreyBackground 
        style={styles.greyBg} 
        greyDisplay={newGreyDisplay} 
      />
      <RemoveWindow 
        removeWindowDisplay={newRemoveWindowDisplay} 
        noOnPress={handleNoPress} 
        yesOnPress={handleYesPress} 
        onXPress={handleNoPress}  
      />

      <TopContainer>
        <Greeting name={displayName} />

        <MyItemsHeader onAddPress={handleAddButton} />
      </TopContainer>
    
      <ReactNative.ScrollView
        contentContainerStyle={styles.foodListScroll}
      >
        

        <MyItemsItem removeOnPress={removeItemBtnPress} />
        <MyItemsItem />
        <MyItemsItem />
        <MyItemsItem />
        <MyItemsItem />
      </ReactNative.ScrollView>

    </ContainerUI>
  );
}

const styles = ReactNative.StyleSheet.create({
  foodListScrollNothing:{
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: deviceWidth,
    height: deviceHeight
  },
  foodListScroll:{
    alignItems: "center",
    backgroundColor: "white",
    width: deviceWidth,
    minHeight: deviceHeight, 
  },
  greyBg:{
    minWidth: deviceWidth,
    minHeight: deviceHeight,
  },
});

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: center;
  justify-content: center;
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

const TopContainer = styled.View`
  justify-content: space-between;
  height: 153px;
`;

const GreyBackground = styled.View`
  display: ${props=>props.greyDisplay};
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  z-index: 2;
`;