import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Orders from "../Orders";

const Stack = createNativeStackNavigator();

export default function OrdersStack({ route, navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Your Orders"
        component={Orders}
        options={{ headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
}
