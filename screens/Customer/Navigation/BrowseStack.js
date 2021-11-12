import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShopMenu from "../ShopMenu";
import MenuItem from "../MenuItem";
import ShopBrowsing from "../ShopBrowsing";
import { CartProvider } from "../../../comps/cart";
import styled from "styled-components/native";


import NavButtons from "../../../comps/Customer/Header";

const TextUI = styled.Text`

`

const Stack = createNativeStackNavigator();

export default function BrowseStack({ route, navigation }) {
  return (
  
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen
          name="Search"
          component={ShopBrowsing}
          options={{ headerShadowVisible: false,
            headerTitle: () => false,
            headerRight: () => <NavButtons/> }}
        />
        <Stack.Screen
          name="Menu"
          component={ShopMenu}
          options={{ headerShadowVisible: false,
            headerTitle: () => false,
            headerRight: () => <NavButtons/> }}
        />
        <Stack.Screen
          name="Item"
          component={MenuItem}
          options={{ headerShadowVisible: false,
            headerTitle: () => false,
            headerRight: () => <NavButtons/> }}
        />
      </Stack.Navigator>

  );
}
