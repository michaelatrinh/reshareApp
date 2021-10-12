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
import RestaurantDashboardScreen from "./screens/RestaurantDashboardScreen";
import AddItemsCamera from "./screens/AddItemsCamera";
import AddItemsDetails from "./screens/AddItemsDetails";

//Stack navigator to navigate through screens
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={CustomerHomeScreen} />
        <Stack.Screen name="Store" component={StoreHomeScreen} />

        {/* michael test */}
        <Stack.Screen name="RestaurantDashboard" component={RestaurantDashboardScreen} />
        <Stack.Screen name="AddItemsCamera" component={AddItemsCamera} />
        <Stack.Screen name="AddItemsDetails" component={AddItemsDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
