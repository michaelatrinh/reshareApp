import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from "react";
import * as ReactNative from "react-native";
import { Text } from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

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
} from "firebase/auth";
import firebase, { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../comps/auth";

//compontents
import Greeting from "../../comps/Greeting";
import MyItemsHeader from "../../comps/Store/MyItemsHeader";
import MyItemsItem from "../../comps/Store/MyItemsItem";
import RemoveWindow from "../../comps/Store/RemoveItemConfirmation";
import { useIsFocused } from '@react-navigation/native';

// //pages
// import StoreAddItem from "./Navigation/StoreAddItemStack";

var deviceWidth = ReactNative.Dimensions.get("window").width; //full width
var deviceHeight = ReactNative.Dimensions.get("window").height; //full height

export default function StoreDashboardScreen({ 
  navigation, 
}) {
  //display states
  const [displayName, setDisplayName] = React.useState("");
  const [displayLocation, setDisplayLocation] = React.useState("");
  const [displayType, setDisplayType] = React.useState("");
  const [displayStores, setDisplayStores] = React.useState("");
  const [displayRemove, setDisplayRemove] = React.useState(false);
  const [displayGrey, setDisplayGrey] = React.useState(false);
  const [menu, setMenu] = useState("");
  const [itemName, setItemName] = React.useState("");
  const [itemExpiry, setItemExpiry] = React.useState("");
  const [itemPrice, setItemPrice] = React.useState(0);

  //input states
  const [inputName, setInputName] = useState("");
  const [inputLocation, setInputLocation] = useState("");

  const [navLocation, setNavLocation] = useState("home");

  //get current user from auth context
  const { currentUser } = useContext(AuthContext);

    // This hook returns `true` if the screen is focused, `false` otherwise
    const isFocused = useIsFocused();

  //read user data on mount
  useEffect(() => {
    readUserData(currentUser.uid);
    setMenu(menu)
  }, []);

  useEffect(() => {
    readUserData(currentUser.uid);
    setMenu(menu)
  }, [isFocused]);


  //firebase read user data (name, location, type)
  function readUserData(userId) {
    const nameRef = ref(db, "stores/" + userId + "/username");
    const locationRef = ref(db, "stores/" + userId + "/location");
    const typeRef = ref(db, "stores/" + userId + "/type");
    const menuRef = ref(db, "stores/" + userId + "/menu");
    /*     const itemRef = ref(db, "store/" + userId + "/menu" + []);
    const itemNameRef = ref(db, "store/" + userId + "/menu" + [] + "/name");
    const itemExpiryRef = ref(db, "store/" + userId + "/menu" + [] + "/expiry");
    const itemPriceRef = ref(db, "store/" + userId + "/menu" + [] + "/price"); */

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
      setMenu(data);
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

  var newRemoveWindowDisplay = "none";

  var newGreyDisplay = "none";

  const removeItemBtnPress = (ny) => {
    setDisplayRemove(true);
  };

  // when user pressed no on Removal confirmation window
  const handleNoPress = () => {
    setDisplayRemove(false);
  };

  // when user pressed yes on Removal confirmation window
  const handleYesPress = (itemKey) => {
    setDisplayRemove(false);
    
    // unfinished code trying to remove specified item from database menu list
    return (dispatch) => {
      firebase.database().ref('/menu/' + itemKey.remove());
    }

    //temporary demo code to remove item
    
  };

  if (displayRemove) {
    newRemoveWindowDisplay = "flex";
    newGreyDisplay = "flex";
  }

  const handleAddButton = () => {
    navigation.navigate("Add Item");
  };



  return (
    <SafeAreaView 
      style={styles.safeArea}
      edges={["left", "right"]} >
      
      <GreyBackground 
        style={styles.greyBg} 
        greyDisplay={newGreyDisplay} />
      <RemoveWindow
        removeWindowDisplay={newRemoveWindowDisplay}
        noOnPress={handleNoPress}
        yesOnPress={handleYesPress}
        onXPress={handleNoPress} />

      <TopContainer>
        <Greeting name={displayName} />

        <MyItemsHeader onAddPress={handleAddButton} />
      </TopContainer>

      <ReactNative.ScrollView contentContainerStyle={styles.foodListScroll}>
        {menu ? (
          menu.map((item) => (
            <MyItemsItem
              key={item.name}
              title={item.name}
              item={item}
              expiry="Dec 31"
              quantity="6"
              price="$0.39"
              bgColour="#DFEFB9"
              removeBtnPress={()=>removeItemBtnPress(item.key)}
            />
          ))
        ) : (
          <></>
        )}
      </ReactNative.ScrollView>
    </SafeAreaView>
  );
}

const styles = ReactNative.StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  foodListScrollNothing: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: deviceWidth,
    height: deviceHeight,
  },
  foodListScroll: {
    alignItems: "center",
    backgroundColor: "white",
    width: deviceWidth,
    // minHeight: deviceHeight,
    marginBottom: "-33%",
    marginTop: "3%",
  },
  greyBg: {
    minWidth: deviceWidth,
    minHeight: deviceHeight,
  },
});

const TopContainer = styled.View`
  justify-content: space-between;
  height: 153px;
`;

const GreyBackground = styled.View`
  display: ${(props) => props.greyDisplay};
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  z-index: 2;
`;
