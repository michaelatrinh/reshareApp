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



export default function AddItemsDetails({
    navigation,
}){

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
          <FoodPicContainer>
              <FoodPic style={styles.img} source={require('../../assets/lime2.png')} />
          </FoodPicContainer>
          
          <MegaDetailsContainer>
              {/* Produce Title Section */}
              <TitleContainer>
                  <InputTitle>
                      <ReactNative.Text style={styles.header}>Title</ReactNative.Text>
                  </InputTitle>

                  <TitleInput />
              </TitleContainer>
              
              {/* Expiry Section */}
              <ExpiryContainer>
                  <InputTitle>
                      <ReactNative.Text style={styles.header}>Expiry</ReactNative.Text>
                  </InputTitle>

                  <TitleInput />
              </ExpiryContainer>
                  
              {/* Description Section */}
              <DescriptionContainer>
                  <InputTitle>
                      <ReactNative.Text style={styles.header}>Description</ReactNative.Text>
                  </InputTitle>

                  <DescriptionInput />
              </DescriptionContainer>
          </MegaDetailsContainer>
          
          <ContinueButtonContainer>
            <ReactNative.TouchableOpacity style={styles.postBtn} onPress={Continue}>
              <ReactNative.Text style={styles.postText}>POST</ReactNative.Text>
            </ReactNative.TouchableOpacity>
          </ContinueButtonContainer>
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
  }
})

const MainContainer = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: space-evenly;
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const InputTitle = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  width: 80%;
`;

const TitleInput = styled.TextInput`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
  width: 328px;
  max-height: 50px;
  text-align: left;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
`;

// Expiry
const ExpiryContainer = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

// Description
const DescriptionContainer = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const DescriptionInput = styled.TextInput`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: flex-start;
  width: 328px;
  max-height: 200px;
  text-align: left;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);

`;

// Continue Button after all inputs are entered
const ContinueButtonContainer = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 100px;
`;