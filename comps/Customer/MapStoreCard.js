import React, { useEffect, useState, useRef, useContext } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

const RowUI = styled.TouchableOpacity`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: 70px;
  border-bottom-color: #D6D6D6;
  border-bottom-width: 1px;
  padding: 0 5%;
`;

const ColumnUI = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default function MapStoreCard({ store, route, destination, active, navigation}) {

  return (
    <RowUI style={{backgroundColor: active ? '#EE9837' :  'white'}} onPress={() => navigation.navigate('Menu', {store: store})}>
      <ColumnUI>
        <Text style={{color: active ? 'white' :  'black'}}>
          {store.username} - {store.location}
        </Text>
      </ColumnUI>
      <Feather name="arrow-right-circle" size={24} color={active ? 'white' :  'black'} />
    </RowUI>
  );
}
