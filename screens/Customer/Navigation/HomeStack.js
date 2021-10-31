import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerDashboard from "../CustomerDashboard";
import ShopMenu from "../ShopMenu";
import MenuItem from "../MenuItem";
import ShopLocation from "../ShopLocation";

const Stack = createNativeStackNavigator();

export default function HomeStack({ route, navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={CustomerDashboard}
        options={{
          headerShadowVisible: false, // applied here
        }}
      />

      <Stack.Screen
        name="Menu"
        component={ShopMenu}
        options={{
          headerShadowVisible: false, // applied here
        }}
      />
      <Stack.Screen
        name="Item"
        component={MenuItem}
        options={{ headerTitle: () => false, headerShadowVisible: false }}
      />

      <Stack.Screen
        name="Location"
        component={ShopLocation}
        options={{
          headerShadowVisible: false, // applied here
        }}
      />
    </Stack.Navigator>
  );
}
