import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "./config/firebase";
import { auth } from "./config/firebase";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/StoreHomeScreen";
import CustomerHomeScreen from "./screens/CustomerHomeScreen";
import StoreHomeScreen from "./screens/StoreHomeScreen";

//Stack navigator to navigate through screens
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={CustomerHomeScreen} />
        <Stack.Screen name="Store" component={StoreHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
