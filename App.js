import React, { useState, useContext } from "react";

import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StoreHomeScreen from "./screens/Store/StoreHomeScreen";
import Store from "./screens/Store/Navigation/StoreStack";

import { AuthProvider } from "./comps/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Customer from "./screens/Customer/Navigation/CustomerStack";
import { useFonts } from "expo-font";
import ShopSlider from "./comps/Customer/ShopSlider";
import { stores } from "./comps/Data/StoreData";
import ShopCard from "./comps/Customer/ShopCard";
import CustomerSignup from "./screens/Customer/CustomerSignup";
import { CartProvider } from "./comps/cart";

//Stack navigator to navigate through screens
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Sign Up" component={CustomerSignup} />
            <Stack.Screen name="Customer" component={Customer} />

            <Stack.Screen name="Store" component={Store} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
