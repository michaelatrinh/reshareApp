import * as React from "react";
import { Image, Dimensions } from "react-native";
import styled from "styled-components/native";
import lime from "../../assets/icon.png";

export default function Picture({ photoUri }) {
  return (
    <>
      {photoUri ? (
        <Image
          style={{ width: "90%", height: 400 }}
          source={{ uri: photoUri }}
        />
      ) : (
        <></>
      )}
    </>
  );
}
