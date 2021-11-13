import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView, Image } from "react-native";
import styled from "styled-components/native";
import ShopImage from "../../assets/store-img.png";



//------ comps -------
import Header from "../../comps/Customer/Header";
import StoreOrderCard from "../../comps/Customer/StoreOrderCard";

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
  color: #EE9837;
  margin-bottom: 40px;
`;

// ---- Your Orders -----

const YourOrderText = styled.Text`
  font-family: "Poppins";
  font-size: 18px;
  margin-bottom: 10px;
`;




export default function Orders({ route, navigation,

StoreName = "Superstore",
StoreLocation = "Brentwood",
Date = "November 1, 2021",
Time = "6:00pm",
Status = "Order Pending",

}) {

  

  return (
    <ScreenUI>
      <Header navigation={navigation}/>

      <ContainerUI>

         <StoreImage source={ShopImage} />

      </ContainerUI>



      <ContentContainer>

            <ContainerRow>
                <StoreText>{StoreName} - {StoreLocation}</StoreText>

                <ViewStoreButton >
                    <ViewStoreText onPress={() => navigation.navigate("Your Orders")}>View Store</ViewStoreText>
                </ViewStoreButton>
            </ContainerRow>

         <StoreDate>{Date} at {Time}</StoreDate>

         <OrderStatus>{Status}</OrderStatus>

{/* ----------- Your Orders ----------- */}


        <YourOrderText>Your Order</YourOrderText>

      </ContentContainer>

      <ScrollView showsVerticalScrollIndicator={false}>

        <StoreOrderCard/>
        <StoreOrderCard/>
        <StoreOrderCard/>


      </ScrollView>


    </ScreenUI>
  );
}