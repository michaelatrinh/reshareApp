import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StoreDashboard from "../StoreDashboard";
import AddItemsCamera from "../AddItemsCamera";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function StoreHomeStack({ route, navigation }){
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={StoreDashboard}
        options={{
          headerShadowVisible: false, // applied here
        }}
    />

    {/* <Stack.Screen
      name="Camera"
      component={AddItemsCamera}
      options={{
        headerShadowVisible: false,
      }}
    /> */}
    </Stack.Navigator>
  )
}