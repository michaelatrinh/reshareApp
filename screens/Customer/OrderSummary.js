import ItemCard from "../../comps/Customer/ItemCard";
import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import styled from "styled-components/native";
import ShopImage from "../../assets/store-img.png";

//------ comps -------
import Header from "../../comps/Customer/Header";
import StoreOrderCard from "../../comps/Customer/StoreOrderCard";
import ItemSummaryCard from "../../comps/Customer/ItemSummaryCard";
import { AuthContext } from "../../comps/auth";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { getDatabase, ref, onValue, set, update } from "firebase/database";

const ScreenUI = styled.View`
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  justify-content: flex-start;
  width: 100%;
`;

const StoreImage = styled.Image`
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
`;

const StoreText = styled.Text`
  font-family: "Poppins";
  font-size: 18px;
  justify-content: flex-start;
`;

const ContentContainer = styled.View`
  justify-content: flex-start;
  width: 90%;
`;

const ContainerRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

//----- View Store Button ------
const ViewStoreButton = styled.View`
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 10px;
`;

const ViewStoreText = styled.Text`
  font-family: "Poppins";
  font-size: 13px;
`;
// ---- End of View Store Button ------

const StoreDate = styled.Text`
  margin-bottom: 10px;
`;

const OrderStatus = styled.Text`
  color: #ee9837;
  margin-bottom: 40px;
`;

// ---- Your Orders -----

const YourOrderText = styled.Text`
  font-family: "Poppins";
  font-size: 18px;
  margin-bottom: 10px;
`;

const Total = styled.Pressable`
  height: 37px;
  border: 0.5px solid #d3cdcd;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export default function Orders({
  route,
  navigation,

  StoreName = "Superstore",
  StoreLocation = "Brentwood",
  Date = "November 1, 2021",
  Time = "6:00pm",
  Status = "Order Pending",
}) {

  const {order} = route.params;

  const [curOrder, setCurOrder] = useState([]);

  const currentUser = useContext(AuthContext);
  const uid = currentUser.currentUser.uid;

  useEffect(() => {
    readUserData(uid);
  }, []);

  //firebase read user data (name, location, type)
  function readUserData(userId) {
    const menuRef = ref(db, "orders/" + userId);
    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      if(data){
        console.log(data.order.filter(x => x.number === order.number)[0].complete)
      }
    });
  }


  const handleUpdateInfo = () => {
    update(ref(db, "orders/" + userId), {
      order: updateOrder,
    });
  };


  console.log(order)
  return (
    <ScreenUI>
      <Header navigation={navigation} />

      <ContainerUI>
        <StoreImage source={ShopImage} />
      </ContainerUI>

      <ContentContainer>
        <ContainerRow>
          <StoreText>
            {order.name} - {order.location}
          </StoreText>

          <ViewStoreButton>
            <ViewStoreText onPress={() => navigation.navigate("Your Orders")}>
              View Store
            </ViewStoreText>
          </ViewStoreButton>
        </ContainerRow>

        <StoreDate>
          Pickup at {order.pickupTime}
        </StoreDate>

        <OrderStatus>{order.complete ? 'Order Complete' :  'Order Pending'}</OrderStatus>

        {/* ----------- Your Orders ----------- */}

        <YourOrderText>Your Order</YourOrderText>
      </ContentContainer>

      <ScrollView showsVerticalScrollIndicator={false} style={{width: '90%'}}>
        {order.cart.map(x => <ItemSummaryCard key={x.name} item={x}/>)}
        
  

        {/* ----------- Total Items and Price -------- */}
        <Total style={{ marginTop: 10 }}>
          <Text>{order.cart.length} item{order.cart.length > 1 ? 's' : ''}</Text>
          <Text>total ${order.total}</Text>
        </Total>
        {/* ---------- End Of items and Price --------- */}
      </ScrollView>
    </ScreenUI>
  );
}
