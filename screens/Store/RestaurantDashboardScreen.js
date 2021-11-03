import * as React from "react";
import styled from "styled-components/native";
import * as ReactNative from "react-native";
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
    produce, //may cause errors -Michael
} from "firebase/auth";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";



export default function RestaurantDashboardScreen({
    navigation,
}){
    const [emptyPage, setEmptyPage] = React.useState(true);

    const addItems = () => {
        navigation.navigate("AddItemsCamera");
    }

    if(emptyPage === true){
        return (
            <EmptyPage>
                <ReactNative.Text>You do not have any ingredients added.</ReactNative.Text>
                <AddItemsButton title="Add Items" onPress={addItems} />
            </EmptyPage>
        );
    }

    return (
        <>
        </>
    );
}

const EmptyPage = styled.View`
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`;

const AddItemsButton = styled.Button`
    flex: 1;
    background-color: #ddd;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 50px;
    text-align: center;
    margin: 10px 0;
`;