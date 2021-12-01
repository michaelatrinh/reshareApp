import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef, useContext } from "react";
import * as ReactNative from "react-native";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";
import OrderDetailItems from "../../comps/Store/OrderDetailItems";
import Header from "../../comps/Customer/Header";

import { initializeApp } from "@firebase/app";

import { AuthContext } from "../../comps/auth";
import { getDatabase, ref, onValue, set, update } from "firebase/database";

import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";

export default function StoreDashboardScreen({ navigation }) {
  const currentUser = useContext(AuthContext);
  const uid = currentUser.currentUser.uid;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    readUserData();
  }, []);

  function readUserData() {
    const menuRef = ref(db, "orders/");

    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();

      Object.keys(data).forEach(function (key) {

        setOrders(data[key].order.filter((x) => x.store === uid));
        
      });
    });
  }

  console.log(orders);

  return (
    <ScreenUI>
      <Header navigation={navigation} />

      <ContainerUI>
        <TitleCont>
          <TitleUI>Order Details</TitleUI>
        </TitleCont>

        <Table>
          <TableTitle>
            <Text>Order ID</Text>
            <Text>Pickup Time</Text>
            <Text>Order Status</Text>
          </TableTitle>
          {orders.map((order) => (
            <OrderDetailItems key={order.number} order={order} />
          ))}
        </Table>
      </ContainerUI>
    </ScreenUI>
  );
}

const ScreenUI = styled.View`
  height: 100%;
  background-color: white;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100%;
`;

const TitleUI = styled.Text`
  justify-content: flex-start;
  font-weight: normal;
  font-family: "Poppins";
  font-size: 20px;
  margin: 15px 0 10px 15px;
`;

const TitleCont = styled.View`
  background-color: #fff;
  display: flex;
`;

const Table = styled.View``;

const TableTitle = styled.View`
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  border: 0.5px solid #c2d1d9;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  padding: 0 20px;
`;
