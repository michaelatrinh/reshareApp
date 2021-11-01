import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "../config/firebase";

//Stack navigator to navigate through screens
const Stack = createNativeStackNavigator();

export default function SignoutButton({ route, navigation }) {
  const handleSignOut = async () => {
    try {
      auth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onPress={handleSignOut} title="signout" color="#000000" />;
}
