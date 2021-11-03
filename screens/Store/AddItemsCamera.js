import * as React from "react";
import styled from "styled-components/native";
import * as ReactNative from "react-native";
import { initializeApp } from "@firebase/app";

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
        navigation.navigate("AddItemsDetails");
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
                <TakePictureButton title="" onPress={snapPic}/>
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
    align-items: center;
    justify-content: center;
`;

const TakePictureButton = styled.TouchableOpacity`
    border-radius: 100px;
    border: 5px solid black;
    width: 100px;
    height: 100px;
    background-color: #800000;
`;