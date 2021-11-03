import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreDashboard from "../StoreDashboard";

const Stack = createNativeStackNavigator();

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
    </Stack.Navigator>
  )
}