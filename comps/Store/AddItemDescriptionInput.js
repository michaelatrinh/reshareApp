import { useLinkProps } from '@react-navigation/native';
import * as React from 'react';
import * as ReactNative from 'react-native';
import styled from 'styled-components/native';
import { useFonts } from 'expo-font';

var deviceWidth = ReactNative.Dimensions.get('window').width; //full width
var deviceHeight = ReactNative.Dimensions.get('window').height; //full height

export default function TextInput({
  header = "",
  inputPlaceholder = "",
  inputValue,
}) {
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
      <ReactNative.View style={styles.headerContainer}>
        <ReactNative.Text style={styles.header}>{header}</ReactNative.Text>
      </ReactNative.View>

      <ReactNative.TextInput
        style={styles.input}
        placeholder={inputPlaceholder}
        value={inputValue}
        multiline={true}
      />
    </ReactNative.View>
  );
}

const styles = ReactNative.StyleSheet.create({
  container: {
    width: "90%",
    height: 99,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  header: {
    fontFamily: "UbuntuBold",
    fontSize: 12,
  },
  input: {
    width: "100%",
    height: 74,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
  },
})