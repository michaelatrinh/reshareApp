import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";
import Header from "../../comps/Customer/Header";
import { AuthContext } from "../../comps/auth";
import { getDatabase, ref, onValue, set, update } from "firebase/database";

import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";

//------ comps -------
import OrderCard from "../../comps/Customer/OrderCard";

const ScreenUI = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  width: 100%;
  height: 100%;
  margin-left: 5%;
`;

const OrderCardContainer = styled.View`
  display: flex;
`;

const HeaderUI = styled.Text`
  font-family: "Poppins";
  font-size: 22px;
  justify-content: flex-start;
  margin: 20px 0 10px 0;
`;

export default function Orders({ route, navigation }) {
  const [currentOrders, setCurrentOrders] = useState(null);
  const [pastOrders, setPastOrders] = useState(null);

  const currentUser = useContext(AuthContext);
  const uid = currentUser.currentUser.uid;

  useEffect(() => {
    readUserData();
  }, []);

  function readUserData() {
    const menuRef = ref(db, "orders/" + uid);

    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const completeOrders = data.order.filter((x) => x.complete === true);
        const currentOrders = data.order.filter((x) => x.complete === false);

        setCurrentOrders(currentOrders);
        setPastOrders(completeOrders);

        console.log(currentOrders);
      }
    });
  }

  return (
    <>
    <Header navigation={navigation} />
      <ScreenUI>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          <ContainerUI>
            <HeaderUI>Current Orders</HeaderUI>

            <OrderCardContainer>
              {currentOrders ? (
                currentOrders.map((order) => (
                  <OrderCard
                    key={order.number}
                    order={order}
                    store={order.name}
                    location={order.location}
                    time={order.pickupTime}
                    itemsOrdered={order.cart.length}
                    navigation={navigation}
                  />
                ))
              ) : (
                <Text>No orders yet!</Text>
              )}
            </OrderCardContainer>

            <HeaderUI>Past Orders</HeaderUI>

            <OrderCardContainer>
              {pastOrders ? (
                pastOrders.map((x) => (
                  <OrderCard
                    key={order.number}
                    order={order}
                    store={order.name}
                    location={order.location}
                    time={order.pickupTime}
                    itemsOrdered={order.cart.length}
                    navigation={navigation}
                  />
                ))
              ) : (
                <Text>No orders yet!</Text>
              )}
            </OrderCardContainer>
          </ContainerUI>
        </ScrollView>
      </ScreenUI>
    </>
  );
}
