import React, { useState, useContext } from "react";

import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
<<<<<<< HEAD
import HomeScreen from "./screens/StoreHomeScreen";
import CustomerHomeScreen from "./screens/CustomerHomeScreen";
import StoreHomeScreen from "./screens/StoreHomeScreen";
import RestaurantDashboardScreen from "./screens/RestaurantDashboardScreen";
import AddItemsCamera from "./screens/AddItemsCamera";
import AddItemsDetails from "./screens/AddItemsDetails";
=======

import StoreHomeScreen from "./screens/Store/StoreHomeScreen";

import { AuthProvider } from "./comps/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Customer from "./screens/Customer/Navigation/CustomerStack";
import { useFonts } from 'expo-font';

>>>>>>> 6cf4ad93dded0a2d92c3ff9a8382a1b727587e77

//Stack navigator to navigate through screens
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {



  return (
<<<<<<< HEAD
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
=======
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Customer" component={Customer} />

          <Stack.Screen name="Store" component={StoreHomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
>>>>>>> 6cf4ad93dded0a2d92c3ff9a8382a1b727587e77
  );
}
