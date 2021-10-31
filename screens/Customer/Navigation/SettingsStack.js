import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../Settings";

const Stack = createNativeStackNavigator();

export default function SettingsStack({ route, navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Your Settings"
        component={Settings}
        options={{ headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
}
