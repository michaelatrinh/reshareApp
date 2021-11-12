import React, { useEffect, useState, useRef, useContext } from 'react';
import * as ReactNative from 'react-native';
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
    produce, //may cause errors -Michael
} from "firebase/auth";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";

//components
import Picture from '../../comps/Store/AddItemPicture';
import TextInput from '../../comps/Store/AddItemTextInput';
import PriceInput from '../../comps/Store/AddItemPricesTextInput';
import DescInput from '../../comps/Store/AddItemDescriptionInput';

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
    <ReactNative.SafeAreaView style={styles.safeArea}>
      <ReactNative.ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewInside}
        centerContent={true}
      >
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
        
        <ContinueButtonContainer>
          <ReactNative.TouchableOpacity style={styles.postBtn} onPress={Continue}>
            <ReactNative.Text style={styles.postText}>POST</ReactNative.Text>
          </ReactNative.TouchableOpacity>
        </ContinueButtonContainer>
      </ReactNative.ScrollView>
    </ReactNative.SafeAreaView>
  );
}

const styles = ReactNative.StyleSheet.create({
  safeArea:{
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: deviceWidth,
  },
  postBtn:{
    backgroundColor: "#DFEFB9",
    width: 170,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postText:{
    fontFamily: "UbuntuBold",
    fontSize: 12,
  },
  scrollView:{
    minHeight: deviceHeight,
    width: deviceWidth,
  },
  scrollViewInside:{
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: deviceHeight * 1.15,
    maxWidth: deviceWidth * 0.9,
  },
})

// Continue Button after all inputs are entered
const ContinueButtonContainer = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 100px;
`;