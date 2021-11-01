import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import LoginScreen from "./screens/LoginScreen";
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
import HomeScreen from "./screens/Store/StoreHomeScreen";
import CustomerHomeScreen from "./screens/Customer/CustomerHomeScreen";
import StoreHomeScreen from "./screens/Store/StoreHomeScreen";
import StoreMenu from "./screens/Customer/StoreMenu";
import { db } from "./config/firebase";
import { auth } from "./config/firebase";
import { AuthContext, AuthProvider } from "./comps/auth";
import SignoutButton from "./comps/SignoutButton";
>>>>>>> 8cc0251b542c21a706254aedce2aa91f3caa5e8f

//Stack navigator to navigate through screens
const Stack = createNativeStackNavigator();

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
>>>>>>> 8cc0251b542c21a706254aedce2aa91f3caa5e8f
  );
}
