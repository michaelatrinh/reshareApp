import React, { useState, useContext } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { useFonts } from "expo-font";

const ContainerUI = styled.View`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  font-family: "Poppins";
  width: 90%;
  padding: 30px 0;
  display: flex;
`;

const HeadingUI = styled.Text`
  font-family: "Poppins";
  font-weight: 500;
  font-size: 16px;
`;

const InputUI = styled.TextInput`
  background-color: #ddd;
  align-items: center;
  justify-content: center;
  width: 90%;
  min-height: 50px;
  text-align: center;
  margin: 10px 0;
  font-family: "Poppins";
  background: #ffffff;
  border: 1px solid #ee9837;
  border-radius: 10px;
`;

const ButtonUI = styled.Pressable`
  background-color: #000000;
  color: white;
  width: 90%;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 50px;
  margin: 10px 0;
  font-family: "Poppins";
  background: #ee9837;
  border-radius: 5px;
`;

const ButtonTextUI = styled.Text`
  font-family: "Poppins";
  color: white;
`;

const ErrorTextUI = styled.Text`
  font-family: "Poppins";
  color: red;
`;

const CreateAccountUI = styled.Pressable``;

const CreateAccountTextUI = styled.Text`
  color: #ee9837;
  font-size: 10px;
  font-family: "Poppins";
`;

export default function LoginCard({
  navigation,
  email,
  setEmail,
  password,
  setPassword,
  handleSignIn,
  handleSignUp,
  setCreatePassword,
  setCreateEmail,
  setConfirmPassword,
  createAccountError,
  createEmail,
  createPassword,
}) {
  const [page, setPage] = useState(false);

  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      {!page ? (
        <ContainerUI>
          <HeadingUI>Welcome to Reshare!</HeadingUI>
          <InputUI
            placeholder="User Email"
            onChangeText={(text) => setEmail(text)}
          />
          <InputUI
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
          />

          <ButtonUI onPress={() => handleSignIn(email, password)}>
            <ButtonTextUI>Sign In</ButtonTextUI>
          </ButtonUI>
          <CreateAccountUI onPress={() => setPage(true)}>
            <CreateAccountTextUI>Create Account</CreateAccountTextUI>
          </CreateAccountUI>
        </ContainerUI>
      ) : (
        <ContainerUI>
          <HeadingUI>Create an Account</HeadingUI>
          <InputUI
            placeholder="User Email"
            onChangeText={(text) => setCreateEmail(text)}
          />
          <InputUI
            placeholder="Password"
            onChangeText={(text) => setCreatePassword(text)}
          />
          <InputUI
            placeholder="Confirm password"
            onChangeText={(text) => setConfirmPassword(text)}
          />

          <ButtonUI onPress={handleSignUp}>
            <ButtonTextUI>Create Account</ButtonTextUI>
          </ButtonUI>

          <ErrorTextUI>{createPassword}</ErrorTextUI>
          <ErrorTextUI>{createEmail}</ErrorTextUI>
          <ErrorTextUI>{createAccountError}</ErrorTextUI>
          <CreateAccountUI onPress={() => setPage(!page)}>
            <CreateAccountTextUI>Sign In</CreateAccountTextUI>
          </CreateAccountUI>
        </ContainerUI>
      )}
    </>
  );
}
