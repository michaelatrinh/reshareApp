import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import BrowseStack from "./BrowseStack";
import LocationStack from "./LocationStack";
import OrdersStack from "./OrdersStack";
const Tab = createBottomTabNavigator();

export default function Customer({ route, navigation }) {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Browse" component={BrowseStack} />
        <Tab.Screen name="Orders" component={OrdersStack} />
        <Tab.Screen name="Location" component={LocationStack} />
      </Tab.Navigator>
    </>
  );
}
