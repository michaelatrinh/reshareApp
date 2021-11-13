import * as React from 'react';
import * as ReactNative from 'react-native';
import styled from 'styled-components/native';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';

export default function RemoveWindow({
  removeWindowDisplay="none",
  noOnPress=()=>{},
  yesOnPress=()=>{},
  onXPress=()=>{},
}){
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
    UbuntuMedium: require("../../assets/fonts/Ubuntu/Ubuntu-Medium.ttf")
  });

  if (!loaded) {
    return null;
  }

  return (
    <Container removeWindowDisplay={removeWindowDisplay}>
      <Window>
        <FirstContainer>
          <Feather 
            name="x-circle" 
            size={11} 
            style={styles.x} 
            onPress={onXPress} 
          />
        </FirstContainer>

        <SecondContainer>
          <ReactNative.Text style={styles.text}>Are you sure you want to remove this item from listings?</ReactNative.Text>
        </SecondContainer>

        <ThirdContainer>
          <ReactNative.TouchableOpacity 
            style={styles.no} 
            activeOpacity={0.5} 
            onPress={noOnPress}
          >
            <ReactNative.Text style={styles.noText}>NO</ReactNative.Text>
          </ReactNative.TouchableOpacity>
          
          <ReactNative.TouchableOpacity 
            style={styles.yes} 
            activeOpacity={0.5} 
            onPress={yesOnPress}
          >
            <ReactNative.Text style={styles.yesText}>YES</ReactNative.Text>
          </ReactNative.TouchableOpacity>
        </ThirdContainer>
      </Window>
    </Container>        
  )
}

const styles = ReactNative.StyleSheet.create({
  text:{
    fontFamily: "Poppins",
    fontSize: 12,
    textAlign: "center",
  },
  x:{
    top: "5%",
    left: "25%",
  },
  no:{
    width: 77,
    height: 27,
    backgroundColor: "#FFE0E0",
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
  },
  noText:{
    fontSize: 12,
    fontFamily: "UbuntuMedium",
  },
  yes:{
    width: 77,
    height: 27,
    backgroundColor: "#DBEABA",
    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",
  },
  yesText:{
    fontSize: 12,
    fontFamily: "UbuntuMedium",
  }
})

const Container = styled.View`
    width: 210px;
    height: 163px;
    box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.25);
    display: ${props=>props.removeWindowDisplay};
    z-index: 3;
    position: absolute;
`;

  const Window = styled.View`
    width: 210px;
    height: 163px;
    background-color: #FBFBFB;
    border-radius: 10px;

    justify-content: center;
    align-items: center;
  `;

    const FirstContainer = styled.View`
      flex-grow: 1;
      flex-direction: row;
      width: 100%;
      
    `;

    const SecondContainer = styled.View`
      flex-grow: 2;
      justify-content: center;
      align-items: center; 
      max-width: 80%;
    `;

    const ThirdContainer = styled.View`
      flex-grow: 1;
      flex-direction: row;
      width: 80%;
      justify-content: space-between;
    `;