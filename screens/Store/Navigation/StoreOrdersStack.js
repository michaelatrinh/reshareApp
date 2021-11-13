import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreOrders from "../StoreOrders";
import OrderPage from "../StoreOrderPage";

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

<Stack.Screen
        name="Order Page"
        component={OrderPage}
        options={{
          headerShadowVisible: false, // applied here
        }}
    />
    </Stack.Navigator>
  )
}