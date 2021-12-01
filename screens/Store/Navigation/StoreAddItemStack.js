import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreAddItem from "../AddItemsCamera";
import AddItemsDetails from "../AddItemsDetails";
import StoreDashboardScreen from "../StoreDashboard";

const Stack = createNativeStackNavigator();

export default function StoreHomeStack({ 
  route, navigation
}){
  const config = {
    screens : {
      Details : {
        initialRouteName : "Camera"
      }
    }
  }

  return (
    <Stack.Navigator
      initialRouteName="Camera" 
      options={config} >
      <Stack.Screen
        name="Camera"
        component={StoreAddItem}
        options={{
          headerShadowVisible: false, // applied here
        }}
      />

      <Stack.Screen
        name="Details"
        component={AddItemsDetails}
        options={{
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}