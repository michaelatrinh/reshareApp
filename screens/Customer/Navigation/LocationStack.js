import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShopLocation from "../ShopLocation";

const Stack = createNativeStackNavigator();

export default function LocationStack({ route, navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Location"
        component={ShopLocation}
        options={{ headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
}
