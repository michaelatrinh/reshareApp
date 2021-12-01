import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreOrders from "../StoreOrders";
import OrderPage from "../StoreOrderPage";
import OrderSummary from "../StoreOrderSummary";

import NavButtons from "../../../comps/Customer/Header";


const Stack = createNativeStackNavigator();

export default function StoreHomeStack({ route, navigation }){
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Store Orders"
        component={StoreOrders}
        options={{
          headerShadowVisible: false,
          headerTitle: () => false,
          // applied here
        }} />

      <Stack.Screen
        name="Order Page"
        component={OrderPage}
        options={{
          headerShadowVisible: false,
          headerTitle: () => false,
          // applied here
        }} />

      <Stack.Screen 
        name="Order Summary"
        component={OrderSummary}
        options={{
          headerShadowVisible: false,
        }} />

    </Stack.Navigator>
  )
}