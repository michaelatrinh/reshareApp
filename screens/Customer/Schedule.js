import Header from "../../comps/Customer/Header";
import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { CartContext } from "../../comps/cart";
import CartList from "../../comps/Customer/CartList";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { AuthContext } from "../../comps/auth";

const ScreenUI = styled.View`
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  width: 90%;
  min-height: 100%;
  display: flex;
`;

const Top = styled.View`
  display: flex;
  flex-direction: column;
  height: 63%;
`;

const Bottom = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;
const TitleUI = styled.Text`
  display: flex;
  justify-content: flex-start;
  font-weight: normal;
  font-family: Poppins;
  font-size: 20px;
  margin: 15px 0;
`;

const DateUI = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  margin: 15px 0;
`;

const CartCont = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Total = styled.Pressable`
  width: 100%;
  height: 37px;
  border: 0.5px solid #d3cdcd;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const OrderMore = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 100px;
  left: 5%;
  width: 90%;
`;
const OrderMoreText = styled.Text`
  font-weight: normal;
  font-family: Poppins;
  color: #ee9837;
  font-size: 14px;
`;
const Checkout = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 43px;
  background-color: #ee9837;
  border-radius: 10px;
  flex-direction: row;
  position: absolute;
  bottom: 25px;
  left: 5%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const CheckoutText = styled.Text`
  font-size: 11px;
  color: #ffffff;
  justify-content: center;
  margin-left: 40px;
`;

const Price = styled.View`
  width: 46px;
  height: 21px;
  background-color: #fde9c2;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

const PriceText = styled.Text`
  font-family: Poppins;
  font-size: 10px;
  color: #9b9b9b;
`;

const GridUI = styled.View`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

const PickupTimeUI = styled.TouchableOpacity`
  width: 83px;
  height: 24px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
`;

const pickupTimes = [
  "1:15pm",
  "1:30pm",
  "1:45pm",
  "2:00pm",
  "2:15pm",
  "2:30pm",
  "2:45pm",
  "3:00pm",
  "3:15pm",
  "3:30pm",
  "3:45pm",
  "4:00pm",
];

const ButtonCont = styled.View``;
export default function Cart({ route, navigation }) {
  const { cartTotal, setCartTotal, cart, setCart, addItemToCart } =
    useContext(CartContext);

  const { store } = route.params;

  const total = cartTotal.toFixed(2);

  const [pickupTime, setPickupTime] = useState(null);

  const [order, setOrder] = useState([]);

  const [updateOrder, setUpdateOrder] = useState(null);

  const orderNumber = Math.floor(Math.random() * (999999 - 1)) + 1;

  const currentUser = useContext(AuthContext);
  const uid = currentUser.currentUser.uid;

  console.log(store.username)

  useEffect(() => {
    if (order) {
      /* console.log(order); */
    } else {
      /* console.log("yo"); */
    }
  }, [order]);

  useEffect(() => {
    readUserData(uid);
  }, []);

  //firebase read user data (name, location, type)
  function readUserData(userId) {
    const menuRef = ref(db, "orders/" + userId);
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      if(data){
      setOrder(data.order);
      }
    });
  }

  const handleCheckout = () => {
    if (pickupTime) {
      navigation.navigate("Confirmation", {
        cartTotal: cartTotal,
        pickupTime: pickupTime,
        store: store,
        cart: cart,
        orderNumber: orderNumber,
      });

      addOrder();
    } else {
      Alert.alert("Select a pickup time!");
    }
  };

  const addOrder = () => {
    setUpdateOrder([
      ...order,
      {
        number: orderNumber,
        total: cartTotal,
        pickupTime: pickupTime,
        pickupLocation: store.address,
        name: store.username,
        location: store.location,
        cart: cart,
        customer: uid,
        store: store.uid,
        complete: false
      },
    ]);
  };

  useEffect(() => {
    if (updateOrder) {
      /* console.log(updateOrder); */
      handleUpdateInfo();
    } else {
      /* console.log("no"); */
    }
  }, [updateOrder]);

  const handleUpdateInfo = () => {
    update(ref(db, "orders/" + uid), {
      order: updateOrder,
    });
  };

  return (
    <>
      <ScreenUI>
        <Header navigation={navigation} />
        <ContainerUI>
          <Top>
            <TitleUI>Schedule Pick Up</TitleUI>
            <DateUI>Today Dec 3, 2022</DateUI>
            <CartCont>
              <GridUI>
                {pickupTimes.map((x) => (
                  <PickupTimeUI
                    key={x}
                    style={{
                      backgroundColor: pickupTime === x ? "#FDE9C2" : "#ffffff",
                    }}
                    onPress={() => setPickupTime(x)}
                  >
                    <Text>{x}</Text>
                  </PickupTimeUI>
                ))}
              </GridUI>
              <Total style={{ marginTop: 10 }}>
                <Text>{cart.length} items</Text>
                <Text>total ${total}</Text>
              </Total>
            </CartCont>
          </Top>
        </ContainerUI>
      </ScreenUI>

      <Checkout onPress={handleCheckout}>
        <CheckoutText>PROCEED TO CHECKOUT</CheckoutText>
        <Price>
          <PriceText>${total}</PriceText>
        </Price>
      </Checkout>
    </>
  );
}
