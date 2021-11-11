import React, { useEffect, useState, useRef, useContext } from 'react'; from "react";
import styled from "styled-components/native";
import React, { useEffect, useState, useRef, useContext } from 'react';Native from "react-native";
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

export default function AddItemsDetails({
    navigation,
}){
    const Continue = () => {
        navigation.navigate("RestaurantDashboard");
    }

    return (
        <MainContainer>
            <FoodPicContainer>
                <FoodPic source={require('../assets/adaptive-icon.png')} />
            </FoodPicContainer>
            
            <MegaDetailsContainer>
                {/* Produce Title Section */}
                <TitleContainer>
                    <InputTitle>
                        <ReactNative.Text style={{
                            fontSize:24
                        }}>Title</ReactNative.Text>
                    </InputTitle>

                    <TitleInput />
                </TitleContainer>
                
                {/* Expiry Section */}
                <ExpiryContainer>
                    <InputTitle>
                        <ReactNative.Text style={{
                            fontSize:24
                        }}>Expiry</ReactNative.Text>
                    </InputTitle>

                    <TitleInput />
                </ExpiryContainer>
                    
                {/* Description Section */}
                <DescriptionContainer>
                    <InputTitle>
                        <ReactNative.Text style={{
                            fontSize:24
                        }}>Description</ReactNative.Text>
                    </InputTitle>

                    <DescriptionInput />
                </DescriptionContainer>
            </MegaDetailsContainer>
            
            <ContinueButtonContainer>
                <ContinueButton title="Add Item" onPress={Continue} />
            </ContinueButtonContainer>
        </MainContainer>
    );
}

const MainContainer = styled.View`
    flex-grow: 1;
    align-items: center;
    justify-content: space-evenly;
`;

// Food Picture Styling
const FoodPicContainer = styled.View`
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    background-color: black;
    max-height: 329px;
    max-width: 329px;
`;

const FoodPic = styled.Image`
    background-color: #ddd;
    flex-grow: 1;
    max-height: 329px;
    max-width: 329px;
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
    background-color: #ddd;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
    max-height: 50px;
    text-align: left;
    margin: 10px 0;
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
    background-color: #ddd;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
    max-height: 200px;
    text-align: left;
    margin: 10px 0;
`;

// Continue Button after all inputs are entered
const ContinueButtonContainer = styled.View`
    flex-grow: 1;
    width: 100%;
    max-height: 100px;
`;

const ContinueButton = styled.Button`
    flex-grow: 1;
    background-color: #ddd;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 50px;
    text-align: center;
    margin: 10px 0;
`;