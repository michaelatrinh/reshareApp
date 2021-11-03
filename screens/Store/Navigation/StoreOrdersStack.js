import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreOrders from "../StoreOrders";

const Stack = createNativeStackNavigator();

export default function StoreHomeStack({ route, navigation }){
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={StoreOrders}
        options={{
          headerShadowVisible: false, // applied here
        }}
    />
    </Stack.Navigator>
  )
}