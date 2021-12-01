import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import ShopCardSmall from "./ShopCardSmall";
import { ScrollView, Text } from "react-native";

const ContainerUI = styled.View`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RowUI = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 90%;
  margin: 25px 0 40px 0;
`;

const TagUI = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-radius: 10px;
  height: 28px;
`;

const TagTextUI = styled.Text`
  font-family: Poppins;
  font-size: 10px;
  color: #ee9837;
`;

const SearchBarUI = styled.TextInput`
  border: 1px solid #000000;
  border-radius: 10px;
  width: 90%;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  width: 90%;
  text-align: center;
`;

export default function BrowseSearch({
  heading = "Today's Recommendations!",
  displayStores,
  navigation,
  selection,
  setSelection,
  search,
  setSearch,
}) {
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const handleInput = (e) => {
    setSearch(e.toLowerCase())
  }

  return (
    <ContainerUI>
      <SearchBarUI defaultValue={search} onChangeText={handleInput} />
      <RowUI>
        <TagUI
          style={{
            backgroundColor: selection == "near" ? "#fde9c2" : "#ffffff",
          }}
          onPress={() => setSelection("near")}
        >
          <TagTextUI>stores near you</TagTextUI>
        </TagUI>
        <TagUI
          style={{
            backgroundColor: selection == "saved" ? "#fde9c2" : "#ffffff",
          }}
          onPress={() => setSelection("saved")}
        >
          <TagTextUI>stores saved</TagTextUI>
        </TagUI>

        {/*         <TagUI
          style={{
            backgroundColor: selection == "recommended" ? "#fde9c2" : "#ffffff",
          }}
          onPress={() => setSelection("recommended")}
        >
          <TagTextUI>recommended</TagTextUI>
        </TagUI> */}
      </RowUI>
    </ContainerUI>
  );
}
