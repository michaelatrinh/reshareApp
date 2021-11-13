import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { CartContext } from "../cart";
import { Feather } from "@expo/vector-icons";
import lime from "../../assets/icon.png";
import { Image, Pressable } from "react-native";

const ProfileButtonUI = styled.Pressable`
  font-family: "Ubuntu";
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
  padding: 50px 5% 25px 5%;
  height: 100px;
  position: relative;
  width: 100%;
  background-color: white;
  z-index: 10000;
`;

export default function Header({ navigation, back = true }) {
  return (
    <HeaderUI>
      {back ? (
        <Pressable onPress={() => navigation.goBack(null)}>
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
      ) : (
        <></>
      )}
    </HeaderUI>
  );
}
