import { useLinkProps } from '@react-navigation/native';
import * as React from 'react';
import * as ReactNative from 'react-native';
import styled from 'styled-components/native';
import { useFonts } from 'expo-font';

export default function PostBtn({
  handlePostClick=()=>{},
}){
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
    UbuntuBold: require("../../assets/fonts/Ubuntu/Ubuntu-Bold.ttf")
  });

  if (!loaded) {
    return null;
  }
  
  return (
    <ReactNative.View style={styles.container}>
      <ReactNative.TouchableOpacity
        style={styles.btn}
        onPress={handlePostClick}
      >
        <ReactNative.Text style={styles.text}>POST</ReactNative.Text>
      </ReactNative.TouchableOpacity>
    </ReactNative.View>
  );
}

const styles = ReactNative.StyleSheet.create({
  container:{
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: 100,
  },
  btn:{
    backgroundColor: "#DFEFB9",
    width: "40%",
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontFamily: "UbuntuBold",
    fontSize: 12,
  },
})