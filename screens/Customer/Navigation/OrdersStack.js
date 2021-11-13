import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Orders from "../Orders";
import OrderSummary from "../OrderSummary";

import ShopMenu from "../ShopMenu";
import MenuItem from "../MenuItem";

import NavButtons from "../../../comps/Customer/Header";

const Stack = createNativeStackNavigator();

export default function OrdersStack({ route, navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Your Orders"
        component={Orders}
        options={{
          headerShadowVisible: false,
          headerTitle: () => false,
        }}
      />

      <Stack.Screen 
        name="Orders Summary"
        component={OrderSummary}
        options={{
          headerShadowVisible: false,
          headerTitle: () => false,
        }}
      />

      
    </Stack.Navigator>
  );
}
