import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShopLocation from "../ShopLocation";
import NavButtons from "../../../comps/Customer/Header";

const Stack = createNativeStackNavigator();

export default function LocationStack({ route, navigation }) {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen
        name="Location"
        component={ShopLocation}
        options={{
          headerShadowVisible: false,
          headerTitle: () => false,
          headerRight: () => <NavButtons />,
        }}
      />
    </Stack.Navigator>
  );
}
