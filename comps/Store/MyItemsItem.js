import * as React from 'react';
import * as ReactNative from 'react-native';
import styled from 'styled-components';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons'; 

var deviceWidth = ReactNative.Dimensions.get('window').width; //full width
var deviceHeight = ReactNative.Dimensions.get('window').height; //full height

export default function MyItemsItem({
  Title="Lime",
  Expiry="12/12",
  Quantity="3"
}){
  const [loaded] = useFonts({
    PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Container>
      <FoodImgContainer>
        <ReactNative.Image style={styles.image} source={require("../../assets/lime.png")}/>
      </FoodImgContainer>

      <TextContainer>
        <ReactNative.Text style={styles.text}>{Title}</ReactNative.Text>
        <ReactNative.Text style={styles.text02}>Best Before: {Expiry}</ReactNative.Text>
        <ReactNative.Text style={styles.text02}>Quantity Left: {Quantity}</ReactNative.Text>
      </TextContainer>

      <BtnsContainer>
        <BtnsContainer02>
          <ReactNative.TouchableOpacity style={styles.editBtn} activeOpacity={0.5}>
            <ReactNative.Text style={styles.editBtnText}>EDIT</ReactNative.Text>
          </ReactNative.TouchableOpacity>        
          
          <ReactNative.TouchableOpacity style={styles.removeBtn} activeOpacity={0.5}>
            <ReactNative.Text style={styles.removeBtnText}>REMOVE</ReactNative.Text>
          </ReactNative.TouchableOpacity>
        </BtnsContainer02>
      </BtnsContainer>
    </Container>
  );
}

const styles = ReactNative.StyleSheet.create({
  image:{
    width: 101,
    height: 91,
    backgroundColor: "#DFEFB9",
    resizeMode: "contain"
  },
  text:{
    fontFamily: "PoppinsSemiBold",
    fontSize: 12,
  },  
  text02:{
    fontFamily: "PoppinsSemiBold",
    fontSize: 9,
  },
  editBtn:{
    width: 87,
    height: 24,
    backgroundColor: "#DFEFB9",
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtnText:{
    fontFamily: "Ubuntu",
    fontSize: 8,
  },
  removeBtn:{
    width: 87,
    height: 24,
    backgroundColor: "#F2BCBC",
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtnText:{
    fontFamily: "Ubuntu",
    fontSize: 8,
  }
});

const Container = styled.View`
  flex-direction: row;
  width: 337px;
  height: 91px;
  justify-content: space-evenly;
  margin-bottom: 38px;
`;

  const FoodImgContainer = styled.View`
    flex-grow: 1;
  `;

  const TextContainer = styled.View`
    flex-grow: 4;
    flex-direction: column;
    height: 91px;
    justify-content: space-around;
    align-items: flex-start;
  `;

  const BtnsContainer = styled.View`
    flex-grow: 1;
    flex-direction: column;
    height: 91px;
    justify-content: flex-end;
    align-items: flex-end;
  `;

    const BtnsContainer02 = styled.View`
      flex-grow: 1;
      flex-direction: column;
      justify-content: space-between;
      max-height: 56px;
    `;