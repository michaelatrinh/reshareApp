import React, { useEffect, useState, useRef, useContext } from 'react';
import * as ReactNative from "react-native";
import styled from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StoreHomeStack from './StoreHomeStack';
import StoreAddItemStack from './StoreAddItemStack';
import StoreOrdersStack from './StoreOrdersStack';
import { Feather } from '@expo/vector-icons'; 

// Bottom Nav Comp
const Tab = createBottomTabNavigator();

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
          <ReactNative.TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            activeOpacity={0.5}
          >
            <ReactNative.Text style={{ color: isFocused ? "#EE9837" : "#FDE9C2" }}>
              {label == "Home" ? (
                <Feather name="home" size={24} />
              ) : label == "Add Item" ? (
                  <Feather name="plus-square" size={24} />
              ) : label == "Orders" ? (
                <Feather name="list" size={24} />
              ) : label == ""}
            </ReactNative.Text>
          </ReactNative.TouchableOpacity>
        );
      })}
    </TabBarUI>
  );
}

export default function Store({ route, navigation }){
  return(
    <>
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={StoreHomeStack} />
        <Tab.Screen name="Add Item" component={StoreAddItemStack} />
        <Tab.Screen name="Orders" component={StoreOrdersStack} />        
      </Tab.Navigator>
    </>
  );
}

// styled components
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