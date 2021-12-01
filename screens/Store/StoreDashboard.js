import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from "react";
import * as ReactNative from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

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

  // menu item ref states
  const [menuDbRef, setMenuDbRef] = useState(null);
  const [menuItemKey, setMenuItemKey] = useState(null);

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

      //loop the menu, use the image name and getDownloadURL
      //data[i].url = downloaded url
      //then set menu
      
      setMenu(data)
    });

    setMenuDbRef(menuRef);
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

  // FONTS
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
    UbuntuMedium: require("../../assets/fonts/Ubuntu/Ubuntu-Medium.ttf")
  });

  if (!loaded) {
    return null;
  }

  // variable to display Remove Confirmation Window or not
  var newRemoveWindowDisplay = "none";
  // variable to display Grey Overlay Background or not
  var newGreyDisplay = "none";

  const removeItemBtnPress = (itemKey) => {
    setDisplayRemove(true);
    setMenuItemKey(itemKey);
    
    console.log("\n" + "MENU ITEM KEY STATE: " + menuItemKey + "\n");
  };

  // when user pressed no on Removal confirmation window
  const handleNoPress = () => {
    setDisplayRemove(false);
  };

  // when user pressed yes on Removal confirmation window
  const handleYesPress = () => {
    setDisplayRemove(false);
    let n = menuDbRef;
    let o = menuItemKey;
    // let p = n + o;
    let p = ref(db, n + "/" + o);

    try {
      p.remove();
    } catch (e) {
      console.log("REMOVAL ERROR =>", e);
    }
    
    // unfinished code trying to remove specified item from database menu list
    // return (dispatch) => {
    //   firebase.database().ref('/menu/' + itemKey.remove());
    // }
  };

  // remove window and grey overlay bg value changes on state change
  if(displayRemove){
    newRemoveWindowDisplay = "flex";
    newGreyDisplay = "flex";
  }

  const handleAddButton = () => {
    navigation.navigate("Add Item");
  };



  return (
    <SafeAreaView 
      style={styles.safeArea}
      edges={["left", "right", "bottom"]} >
      
      <GreyBackground 
        style={styles.greyBg} 
        greyDisplay={newGreyDisplay} />

      {/* Remove Confirmation Window */}
      <ReactNative.View
        style={styles.removeWindowMainContainer(newRemoveWindowDisplay)} >
        <ReactNative.View
          style={styles.removeWindowCont} >

          {/* first container: contains "x" icon */}
          <ReactNative.View
            style={styles.firstContainer} >
            <Feather
              name="x-circle"
              size={11}
              style={styles.x}
              onPress={handleNoPress} />
          </ReactNative.View>

          {/* second container: contains main text */}
          <ReactNative.View
            style={styles.secondContainer} >
            <ReactNative.Text 
              style={styles.removeWindowText} >
                Are you sure you want to remove this item from listings?
            </ReactNative.Text>
          </ReactNative.View>

          {/* third container: contains "yes" and "no" buttons */}
          <ReactNative.View
            style={styles.thirdContainer} >
            <ReactNative.TouchableOpacity
              style={styles.no}
              activeOpacity={0.5}
              onPress={handleNoPress} >
              <ReactNative.Text 
                style={styles.removeBtnText} >
                  NO
              </ReactNative.Text>
            </ReactNative.TouchableOpacity>

            <ReactNative.TouchableOpacity
              style={styles.yes}
              activeOpacity={0.5}
              onPress={handleYesPress} >
              <ReactNative.Text 
                style={styles.removeBtnText} >
                  YES
              </ReactNative.Text>
            </ReactNative.TouchableOpacity>
          </ReactNative.View>
        </ReactNative.View>
      </ReactNative.View>

      <TopContainer>
        <Greeting name={displayName} />

        <MyItemsHeader onAddPress={handleAddButton} />
      </TopContainer>

      <ReactNative.ScrollView 
        contentContainerStyle={styles.foodListScroll} >
        {menu ? (
          menu.map((item) => (
            <MyItemsItem
              key={item.name}
              title={item.name}
              item={item}
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
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "white",
    width: deviceWidth,
    // minHeight: deviceHeight,
    paddingBottom: "10%",
    marginTop: "3%",
  },
  greyBg: {
    minWidth: deviceWidth,
    minHeight: deviceHeight,
  },

  // remove confirmation window
  removeWindowMainContainer: (d) => { return {
    width: 210,
    height: 163,
    // boxShadow: "4px 2px 4px rgba(0, 0, 0, 0.25)",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: {width: 4, height: 2},
    shadowRadius: 4,
    display: d,
    zIndex: 3,
    position: "absolute",
    }
  },
  removeWindowCont: {
    width: 210,
    height: 163,
    backgroundColor: "#FBFBFB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  firstContainer: {
    flexGrow: 1,
    flexDirection: "row",
    width: "100%",
  },
  x: {
    top: "5%",
    left: "25%",
  },
  secondContainer: {
    flexGrow: 2,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "80%",
  },
  removeWindowText: {
    fontFamily: "Poppins",
    fontSize: 12,
    textAlign: "center",
  },
  thirdContainer: {
    flexGrow: 1,
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  no: {
    width: 77,
    height: 27,
    backgroundColor: "#FFE0E0",
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
  },
  removeBtnText: {
    fontSize: 12,
    fontFamily: "UbuntuMedium",
  },
  yes: {
    width: 77,
    height: 27,
    backgroundColor: "#DBEABA",
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
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
