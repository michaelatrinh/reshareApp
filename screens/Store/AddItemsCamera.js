import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from "styled-components/native";
import * as ReactNative from "react-native";
import { initializeApp } from "@firebase/app";
import { Feather } from '@expo/vector-icons';

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



export default function AddItemsCamera({
    navigation,
}){
    const [hasPermission, setHasPermission] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <ReactNative.View />;
    }
    if (hasPermission === false) {
        return <ReactNative.Text>No access to camera</ReactNative.Text>;
    }

    const snapPic = () => {
        // takePictureAsync()
        navigation.navigate("Add Item Details");
    }

    return (
        <MainContainer>
            <CameraViewFinder>
                <Camera style={{
                    flexGrow:1
                    }} 
                    autoFocus={Camera.Constants.autoFocus}
                    />
            </CameraViewFinder> 

            <TakePictureButtonContainer>
                <TakePictureButtonCenter title="" onPress={snapPic} />
                <TakePictureButtonOuter onPress={snapPic} />
            </TakePictureButtonContainer>
        </MainContainer>

    );
}

const MainContainer = styled.View`
  flex-grow: 1;
  align-items: center;
  justify-content: space-evenly;
`;

const CameraViewFinder = styled.View`
  flex-grow: 3;
  background-color: #A52A2A;
  width: 100%;
  height: 70%;
`;

const TakePictureButtonContainer = styled.View`
  flex-grow: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #000000;
`;

const TakePictureButtonCenter = styled.TouchableOpacity`
  border-radius: 100px;
  border: 2px solid #000000;
  width: 58px;
  height: 58px;
  background-color: #FFFFFF;

  position: absolute;
  z-index: 2;
`;

const TakePictureButtonOuter = styled.TouchableOpacity`
  border-radius: 100px;
  width: 70px;
  height: 70px;
  background-color: #FFFFFF;
`;