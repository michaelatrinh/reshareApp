import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Store/StoreHomeScreen";
import CustomerHomeScreen from "./screens/Customer/CustomerHomeScreen";
import StoreHomeScreen from "./screens/Store/StoreHomeScreen";
import StoreMenu from "./screens/Customer/StoreMenu";
import { db } from "./config/firebase";
import { auth } from "./config/firebase";
import { AuthContext, AuthProvider } from "./comps/auth";
import SignoutButton from "./comps/SignoutButton";

//Stack navigator to navigate through screens
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            options={({ navigation }) => ({
              headerRight: () => <SignoutButton navigation={navigation} />,
              headerLeft: null,
            })}
            name="Home"
            component={CustomerHomeScreen}
          />
          <Stack.Screen name="Menu" component={StoreMenu} />
          <Stack.Screen name="Store" component={StoreHomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
