import React, { useEffect, useState, useRef, useContext } from 'react';
import * as ReactNative from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styled from "styled-components/native";
import { initializeApp } from "@firebase/app";
import { useFonts } from 'expo-font';
import { Camera } from "expo-camera";

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
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";

//components
import Picture from '../../comps/Store/AddItemPicture';
import TextInput from '../../comps/Store/AddItemTextInput';
import PriceInput from '../../comps/Store/AddItemPricesTextInput';
import DescInput from '../../comps/Store/AddItemDescriptionInput';
import PostBtn from '../../comps/Store/AddItemPostBtn';

var deviceWidth = ReactNative.Dimensions.get('window').width; //full width
var deviceHeight = ReactNative.Dimensions.get('window').height; //full height

export default function AddItemsDetails({
    navigation,
}){
  const [itemName, setItemName] = React.useState("");
  const [itemExpiry, setItemExpiry] = React.useState("");
  const [itemQuantity, setItemQuantity] = React.useState(0);
  const [itemOrigPrice, setItemOrigPrice] = React.useState(0);
  const [itemDiscPrice, setItemDiscPrice] = React.useState(0);

  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
    UbuntuBold: require("../../assets/fonts/Ubuntu/Ubuntu-Bold.ttf")
  });

  if (!loaded) {
    return null;
  }

  const Continue = () => {
      navigation.navigate("Dashboard");
  }

  return (
    <SafeAreaView 
      style={styles.safeArea}
      edges={['left', 'right']}
    >
      <ReactNative.ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewInside}
        centerContent={true}
        showsVerticalScrollIndicator={false}
      >
        {/* <ReactNative.View style={styles.mainContentContainer}> */}
        {/* Camera Picture */}
        <Picture />

        {/* Produce Title Section */}
        <TextInput 
          header="TITLE"
          inputPlaceholder="Type title"
        />
          
        {/* Expiry Section */}
        <TextInput
          header="EXPIRY"
          inputPlaceholder="Select the expiry date"
        />

        {/* Quantity section */}
        <TextInput
          header="QUANTITY"
          inputPlaceholder="Type quantity"
        />
              
        {/* Price Section */}
        <PriceInput 
          header1="ORIGINAL PRICE"
          header2="DISCOUNTED PRICE"
          inputPlaceholder1="Enter original price"
          inputPlaceholder2="Enter discounted price"
        />

        {/* Description Section */}
        <DescInput 
          header="DESCRIPTION"
          inputPlaceholder="Enter description"
        />
        
        {/* Post Button */}
        <PostBtn />
        {/* </ReactNative.View> */}
      </ReactNative.ScrollView>
    </SafeAreaView>
  );
}

const styles = ReactNative.StyleSheet.create({
  safeArea:{
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView:{
    flexGrow: 1,
    // minHeight: deviceHeight,
    // width: deviceWidth,
  },
  scrollViewInside:{
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: deviceHeight * 1.05,
    maxWidth: deviceWidth,
  },
  mainContentContainer:{
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: deviceHeight * 1.05,
    width: deviceWidth * 0.9,
  },
})