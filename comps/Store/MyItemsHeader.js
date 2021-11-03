import * as React from 'react';
import * as ReactNative from 'react-native';
import styled from 'styled-components';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons'; 

var deviceWidth = ReactNative.Dimensions.get('window').width; //full width
var deviceHeight = ReactNative.Dimensions.get('window').height; //full height

export default function MyItemsHeader({

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
      <TextContainer>
        <MyItemsText>My Items</MyItemsText>
      </TextContainer>

      <AddContainer>
        <AddItemText>Add item</AddItemText>
        <ReactNative.TouchableOpacity>
          <Feather name="plus-square" color="#AAAAAA" size={25} />
        </ReactNative.TouchableOpacity>
      </AddContainer>
    </Container>
  );
}

//styled components
const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
`;

// Text
  const TextContainer = styled.View`
    display: flex;
    flex-grow: 50;
  `;

    const MyItemsText = styled.Text`
      font-family: "PoppinsSemiBold";
      font-size: 16;
      left: 5%;
    `;

// Add Btn
  const AddContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
    right: 5%;
  `;

    const AddItemText = styled.Text`
      font-family: "Ubuntu";
      font-size: 12;
    `;