import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { CartContext } from "../cart";
import { Feather } from "@expo/vector-icons";
import lime from "../../assets/icon.png";
import { Image, Pressable } from "react-native";
import ProfileDropdown from "./ProfileDropdown";

const ProfileButtonUI = styled.Pressable`
  font-family: Ubuntu;
  background-color: #4da95d;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 35px;
  overflow: hidden;
`;

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

export default function HeaderRight({ navigation }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, seShowNotification] = useState(false);

  return (
    <>
      {showProfile ? (
        <>
          <ProfileDropdown setShowProfile={setShowProfile} />
        </>
      ) : (
        <></>
      )}

      {showNotification ? (
        <>
          <DropdownOverlayUI />
          <ProfileDropdownUI>
            <Pressable onPress={() => seShowNotification(false)}>
              <Feather name="x" size={24} color="black" />
            </Pressable>
          </ProfileDropdownUI>
        </>
      ) : (
        <></>
      )}
      <HeaderUI>
        <Pressable onPress={() => seShowNotification(true)}>
          <Feather name="bell" size={24} color="black" />
        </Pressable>
        <ProfileButtonUI onPress={() => setShowProfile(true)}>
          <Image source={lime} style={{ width: 48, height: 48 }} />
        </ProfileButtonUI>
      </HeaderUI>
    </>
  );
}
