import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import BrowseStack from "./BrowseStack";
import LocationStack from "./LocationStack";
import OrdersStack from "./OrdersStack";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'; 


import styled from "styled-components/native";
const Tab = createBottomTabNavigator();

const TabBarUI = styled.View`
  background: #ffffff;
  box-shadow: 1px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  height: 80px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <TabBarUI>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label == "Home" ? (
                <Feather name="home" size={24} color="black" />
              ) : label == "Browse" ? (
                <Feather name="search" size={24} color="black" />
              ) : label == "Orders" ? (
                <Feather name="list" size={24} color="black" />
              ) : (
                <Feather name="map-pin" size={24} color="black" />
              )}
            </Text>
          </TouchableOpacity>
        );
      })}
    </TabBarUI>
  );
}

export default function Customer({ route, navigation }) {
  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Browse" component={BrowseStack} />
        <Tab.Screen name="Orders" component={OrdersStack} />
        <Tab.Screen name="Map" component={LocationStack} />
      </Tab.Navigator>
    </>
  );
}
