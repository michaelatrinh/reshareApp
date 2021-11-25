import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerDashboard from "../CustomerDashboard";
import ShopMenu from "../ShopMenu";
import MenuItem from "../MenuItem";
import ShopLocation from "../ShopLocation";
import Cart from "../Cart.js";
import Schedule from "../Schedule"
import OrderConfirmation from "../OrderConfirmation";
import Header from "../../../comps/Customer/Header";

const Stack = createNativeStackNavigator();

export default function HomeStack({ route, navigation }) {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={CustomerDashboard}
          options={{
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="Menu"
          component={ShopMenu}
          options={{
            headerShadowVisible: false,
            headerTitle: () => false,
            headerStyle: {
              backgroundColor: "#f4511e",
              height: 200,
            },
          }}
        />

        <Stack.Screen
          name="Item"
          component={MenuItem}
          options={{
            headerShadowVisible: false,
            headerTitle: () => false,
          }}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShadowVisible: false,
            headerTitle: () => false,
          }}
        />

        <Stack.Screen
          name="Schedule"
          component={Schedule}
          options={{
            headerShadowVisible: false,
            headerTitle: () => false,
          }}
        />

        <Stack.Screen
          name="Confirmation"
          component={OrderConfirmation}
          options={{
            headerShadowVisible: false,
            headerTitle: () => false,
          }}
        />

        <Stack.Screen
          name="Map"
          component={ShopLocation}
          options={{
            headerShadowVisible: false,
            headerTitle: () => false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
