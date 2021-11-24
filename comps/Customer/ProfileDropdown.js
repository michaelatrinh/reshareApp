import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { CartContext } from "../cart";
import { Feather } from "@expo/vector-icons";
import lime from "../../assets/lime.png";
import { Image, Pressable, Text } from "react-native";

const ProfileDropdownUI = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 20% 0;
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
  justify-content: flex-start;
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
  background-color: lightgray;
  width: 125px;
  height: 125px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 0 0 10px 0;

`;

const RowUI = styled.View`
  display: flex;
  width: 80%;
  flex-direction: row;
  align-items: center;
  margin: 0 0 35px 0;
`;

const ColumnUI = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

`;

const NameUI = styled.Text`
  font-size: 28px;
  margin: 0 0 15px;
`;

const LabelUI = styled.Text`
  width: 25%;
  font-size: 14px;
`;

const TextUI = styled.Text`
  width: 50%;
  font-size: 14px;
`;

const EditUI = styled.Pressable`
  width: 25%;

  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const EditTextUI = styled.Text`
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #EE9837;
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
          <ColumnUI>
            <ProfileButtonUI>
              <Image style={{ width: 125, height: 125 }} source={lime} />
            </ProfileButtonUI>

            <EditUI>
              <EditTextUI>edit</EditTextUI>
            </EditUI>
          </ColumnUI>
          <ColumnUI style={{marginLeft: 25}}>
            <NameUI>Name</NameUI>
            <Text> 53 Orders</Text>
          </ColumnUI>
        </RowUI>

        <RowUI>
          <LabelUI>Email</LabelUI>
          <TextUI>trevorjohn@gmail.com</TextUI>
          <EditUI>
            <EditTextUI>edit</EditTextUI>
          </EditUI>
        </RowUI>

        <RowUI>
          <LabelUI>Phone</LabelUI>
          <TextUI>778-910-2302</TextUI>
          <EditUI>
            <EditTextUI>edit</EditTextUI>
          </EditUI>
        </RowUI>

        <RowUI>
          <LabelUI>Password</LabelUI>
          <TextUI>*********</TextUI>
          <EditUI>
            <EditTextUI>edit</EditTextUI>
          </EditUI>
        </RowUI>
      </ProfileDropdownUI>
    </>
  );
}
