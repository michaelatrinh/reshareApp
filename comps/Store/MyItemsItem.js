import * as React from 'react';
import * as ReactNative from 'react-native';
import styled from 'styled-components';
import { useFonts } from 'expo-font';

var deviceWidth = ReactNative.Dimensions.get('window').width; //full width
var deviceHeight = ReactNative.Dimensions.get('window').height; //full height

export default function MyItemsItem({
  title="Lime",
  expiry="Dec 31",
  quantity="3",
  price="$3.99",
  foodPic="",
  removeOnPress=()=>{},
}){
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Container>
      <FoodImgContainer>
        <ReactNative.Image style={styles.image} />
      </FoodImgContainer>

      <TextContainer>
        <ReactNative.Text style={styles.text}>{title}</ReactNative.Text>
        <ReactNative.Text style={styles.text02}>Best before {expiry}</ReactNative.Text>
        <ReactNative.Text style={styles.text02}>Quantity Left: {quantity}</ReactNative.Text>
        <ReactNative.Text style={styles.text03}>{price}</ReactNative.Text>
      </TextContainer>

      <BtnsContainer>
        <BtnsContainer02>
          <ReactNative.TouchableOpacity style={styles.editBtn} activeOpacity={0.5}>
            <ReactNative.Text style={styles.editBtnText}>EDIT</ReactNative.Text>
          </ReactNative.TouchableOpacity>        
          
          <ReactNative.TouchableOpacity style={styles.removeBtn} activeOpacity={0.5} onPress={removeOnPress}>
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
    fontFamily: "Poppins",
    fontSize: 9,
    color: "#656565",
  },
  text03:{
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: "#FE0000"
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