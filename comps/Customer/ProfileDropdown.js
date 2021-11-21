import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { CartContext } from "../cart";
import { Feather } from "@expo/vector-icons";
import lime from "../../assets/lime.png";
import { Image, Pressable, Text } from "react-native";


const HeaderUI = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0 25px 0;
  height: 100px;
  position: absolute;
  right: 5%;
  background: white;

  z-index: 10000;
`;

const ProfileDropdownUI = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 50px 5%;
  height: 50%;
  position: absolute;
  width: 100%;
  top: 0;
  background: white;
  z-index: 90000;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const DropdownOverlayUI = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;

  height: 100%;
  position: absolute;
  width: 100%;
  background: rgba(0, 0, 0, 0.33);

  top: 0;
  left: 0;

  z-index: 80000;
`;

const CloseMenuUI = styled.Pressable`
  position: absolute;
  right: 5%;
  top: 15%;
  z-index: 9999;
`;

const ProfileButtonUI = styled.Pressable`
  font-family: Ubuntu;
  background-color: #4da95d;
  width: 95px;
  height: 95px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;


const RowUI = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;

  align-items: center;
`;

const ColumnUI = styled.View`
  display: flex;
  
`;

export default function ProfileDropdown({ setShowProfile }) {
  return (
    <>
      <DropdownOverlayUI />
      <ProfileDropdownUI>
        <CloseMenuUI onPress={() => setShowProfile(false)}>
          <Feather name="x" size={24} color="black" />
        </CloseMenuUI>

        <RowUI>
          <ProfileButtonUI>
            <Image style={{ width: 95, height: 95 }} source={lime} />
          </ProfileButtonUI>
          <ColumnUI>
            <Text>Name</Text>
            <Text>Orders</Text>
          </ColumnUI>
        </RowUI>
      </ProfileDropdownUI>
    </>
  );
}
