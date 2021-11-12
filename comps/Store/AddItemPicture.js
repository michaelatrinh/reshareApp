import * as React from 'react';
import * as ReactNative from 'react-native';
import styled from 'styled-components/native';

var deviceWidth = ReactNative.Dimensions.get('window').width; //full width
var deviceHeight = ReactNative.Dimensions.get('window').height; //full height

export default function Picture({

}){
  return (
    <ReactNative.View style={styles.container}>
      <ReactNative.Image style={styles.img} />
    </ReactNative.View>
  );
}

const styles = ReactNative.StyleSheet.create({
  container:{
    height: undefined,
    width: deviceWidth,
    aspectRatio: 1/1,

    backgroundColor: "black",
  },
  img:{
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
})