import * as React from 'react';
import * as ReactNative from 'react-native';
import styled from 'styled-components/native';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons'; 

var deviceWidth = ReactNative.Dimensions.get('window').width; //full width
var deviceHeight = ReactNative.Dimensions.get('window').height; //full height

export default function MyItemsHeader({
  onAddPress=()=>{},
}){
  const [loaded] = useFonts({
    PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ReactNative.View style={styles.container}>
      <ReactNative.View style={styles.textCont}>
        <ReactNative.Text style={styles.myItemsTxt}>My Items</ReactNative.Text>
      </ReactNative.View>

      <ReactNative.View style={styles.addCont}>
        <ReactNative.Text style={styles.addItemsTxt}>Add item</ReactNative.Text>
        <ReactNative.TouchableOpacity activeOpacity={0.5} onPress={onAddPress}>
          <Feather name="plus-square" color="#57BA68" size={25} />
        </ReactNative.TouchableOpacity>
      </ReactNative.View>
    </ReactNative.View>
  );
}

const styles = ReactNative.StyleSheet.create({
  container:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: deviceWidth,
    height: 30,
  },
  textCont:{
    flexGrow: 50,
  },
  myItemsTxt:{
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
    left: "5%",
  },
  addCont:{
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    right: "5%"
  },
  addItemsTxt:{
    fontFamily: "Ubuntu",
    fontSize: 12,
  },
})
