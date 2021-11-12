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
      <MainContainer>
        <ReactNative.ScrollView style={styles.scrollView}>
          <FoodPicContainer>
              <FoodPic style={styles.img} />
          </FoodPicContainer>
          
          <MegaDetailsContainer>
              {/* Produce Title Section */}
              <TitleContainer>
                <InputTitle>
                  <ReactNative.Text style={styles.header}>TITLE</ReactNative.Text>
                </InputTitle>
                
                <ReactNative.TextInput
                  style={styles.titleInput}
                  placeholder={"Type title"}
                  value={itemName}
                />
              </TitleContainer>
              
              {/* Expiry Section */}
              <ExpiryContainer>
                <InputTitle>
                    <ReactNative.Text style={styles.header}>EXPIRY</ReactNative.Text>
                </InputTitle>

                <ReactNative.TextInput
                  style={styles.titleInput}
                  placeholder={"Select the expiry date"}
                  value={itemExpiry}
                />
              </ExpiryContainer>

              {/* Quantity section */}
              <ExpiryContainer>
                <InputTitle>
                  <ReactNative.Text style={styles.header}>QUANTITY</ReactNative.Text>
                </InputTitle>

                <ReactNative.TextInput
                  style={styles.titleInput}
                  placeholder={"Select the quantity"}
                  value={itemQuantity}
                />
              </ExpiryContainer>
                  
              <PriceContainer>
                <OrigPrice>
                  <InputTitle>
                    <ReactNative.Text style={styles.header}>ORIGINAL PRICE</ReactNative.Text>
                  </InputTitle>

                  <ReactNative.TextInput
                    style={styles.priceInput}
                    placeholder={"Enter original price"}
                    value={itemOrigPrice}
                  />
                </OrigPrice>

                <DiscPrice>
                  <InputTitle>
                    <ReactNative.Text style={styles.header}>DISCOUNTED PRICE</ReactNative.Text>
                  </InputTitle>

                  <ReactNative.TextInput
                    style={styles.priceInput}
                    placeholder={"Select discounted price"}
                    value={itemDiscPrice}
                  />
                </DiscPrice>
              </PriceContainer>

              <DescriptionContainer>
                <InputTitle>
                  <ReactNative.Text style={styles.header}>DISCOUNTED PRICE</ReactNative.Text>
                </InputTitle>

                <ReactNative.TextInput 
                  style={styles.descInput}
                  multiline={true}
                />
              </DescriptionContainer>
          </MegaDetailsContainer>
          
          <ContinueButtonContainer>
            <ReactNative.TouchableOpacity style={styles.postBtn} onPress={Continue}>
              <ReactNative.Text style={styles.postText}>POST</ReactNative.Text>
            </ReactNative.TouchableOpacity>
          </ContinueButtonContainer>
        </ReactNative.ScrollView>
      </MainContainer>
  );
}

const styles = ReactNative.StyleSheet.create({
  header:{
    fontFamily: "UbuntuBold",
    fontSize: 12,
  },
  img:{
    resizeMode: "contain",
    backgroundColor: "#DFEFB9",
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
    maxWidth: deviceWidth * 0.8,
  },
  titleInput:{
    width: 328,
    height: 49,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 14,
  },
  priceInput:{
    width: 160,
    height: 49,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
  },
  descInput:{
    width: 328,
    height: 74,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
  }
})

const MainContainer = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
`;

// Food Picture Styling
const FoodPicContainer = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
  max-height: 333px;
  max-width: 328px;
`;

const FoodPic = styled.Image`
  background-color: #ddd;
  flex-grow: 1;
  height: 333px;
  width: 328px;
  max-height: 333px;
  max-width: 328px;
`;

// Product Details Styling
const MegaDetailsContainer = styled.View`
  flex-grow: 1;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

// Title
const TitleContainer = styled.View`
  flex-grow: 1;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 72px;
`;

const InputTitle = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

// Expiry
const ExpiryContainer = styled.View`
  flex-grow: 1;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 72px;
`;

// Description
const DescriptionContainer = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 99px;
`;

const PriceContainer = styled.View`
  flex-grow: 1;
  width: 100%;
  height: 72px;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`;

const OrigPrice = styled.View`
  flex-grow: 1;
`;

const DiscPrice = styled.View`
  flex-grow: 1;
`;

// Continue Button after all inputs are entered
const ContinueButtonContainer = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 100px;
`;