import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreAddItem from "../AddItemsCamera";
import AddItemsDetails from "../AddItemsDetails";
import StoreDashboardScreen from "../StoreDashboard";

const Stack = createNativeStackNavigator();

export default function StoreHomeStack({ route, navigation }){
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add Item Camera"
        component={StoreAddItem}
        options={{
          headerShadowVisible: false, // applied here
        }}
      />

      <Stack.Screen
        name="Add Item Details"
        component={AddItemsDetails}
        options={{
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}