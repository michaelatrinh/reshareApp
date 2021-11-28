import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from "styled-components/native";
import * as ReactNative from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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

// components
import PhoneCamera from '../../comps/Store/Camera';


export default function AddItemsCamera({
  navigation,
}){
  const snapPic = () => {
    // takePictureAsync()
    navigation.navigate("Add Item Details");
  }

  return (
    <SafeAreaView 
      style={styles.safeArea}
      edges={['left', 'right']}
    >
      <PhoneCamera takePic={snapPic}/>
    </SafeAreaView>
  );
}

const styles = ReactNative.StyleSheet.create({
  safeArea:{
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

// misc