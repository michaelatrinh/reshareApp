import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShopMenu from "../ShopMenu";
import MenuItem from "../MenuItem";
import ShopBrowsing from "../ShopBrowsing";
import { CartProvider } from "../../../comps/cart";

const Stack = createNativeStackNavigator();

export default function BrowseStack({ route, navigation }) {
  return (
  
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={ShopBrowsing}
          options={{ headerShadowVisible: false }}
        />
        <Stack.Screen
          name="Menu"
          component={ShopMenu}
          options={{ headerShadowVisible: false }}
        />
        <Stack.Screen
          name="Item"
          component={MenuItem}
          options={{ headerTitle: () => false, headerShadowVisible: false }}
        />
      </Stack.Navigator>

  );
}
