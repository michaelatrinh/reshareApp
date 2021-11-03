import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreAddItem from "../AddItemsCamera";

const Stack = createNativeStackNavigator();

export default function StoreHomeStack({ route, navigation }){
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add Item"
        component={StoreAddItem}
        options={{
          headerShadowVisible: false, // applied here
        }}
    />
    </Stack.Navigator>
  )
}