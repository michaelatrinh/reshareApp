import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import styled from "styled-components/native";
import ShopCardSmall from "./ShopCardSmall";
import { ScrollView } from "react-native";
import SkeletonCardSmall from "./SkeletonCardSmall";
import RecommenedCard from "./RecommendCard";

const ContainerUI = styled.View`
  margin: 0 0 30px 0;
  display: inline;
`;

const RowUI = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 0px 0;
  width: 100%;
  padding: 0 5%;
`;

const ScrollUI = styled.View`
  flex-direction: row;
`;

const HeadingUI = styled.Text`
  font-family: "Poppins";
  font-size: 16px;
  justify-content: flex-start;
`;

const ExpandUI = styled.Text`
  justify-content: flex-start;
  font-family: Poppins;
  color: #ee9837;
  font-size: 11px;
`;

export default function RecommenedSlider({
  heading = "Today's Recommendations!",
  displayStores,
  navigation,
}) {
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const length = Object.keys(displayStores).length;

  const stores = Object.values(displayStores)

  if (displayStores) {
    console.log(stores[0].menu);
  }

  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <RowUI>
        <HeadingUI>{heading}</HeadingUI>

        <ExpandUI
          onPress={() => {
            navigation.navigate("Browse", {});
          }}
        >
          {" "}
          See All
        </ExpandUI>
      </RowUI>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 30,
          left: "5%",
        }}
      >
        {
          //skeleton loading
          imagesLoaded >= length ? (
            <></>
          ) : (
            Object.entries(displayStores).map(([key, v]) => {
              return <SkeletonCardSmall key={key} />;
            })
          )
        }

        {/* {stores ? (
          stores.menu.map(v => {
            return <Text>{v.name}</Text>;
          })
        ) : (
          <></>
        )} */}
      </ScrollView>
    </>
  );
}
