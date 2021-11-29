import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import ItemCard from "../../comps/Customer/ItemCard";
import shopImage from "../../assets/store-img.png";
import { Image } from "react-native";
import MenuFilter from "../../comps/Customer/MenuFilter";
import { CartProvider } from "../../comps/cart";
import { CartContext } from "../../comps/cart";
import CartButton from "../../comps/Customer/CartButton";
import Header from "../../comps/Customer/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LocationContext } from "../../comps/location";
import Geocode from "react-geocode";
import axios from "axios";
import getDistance from "../../comps/getDistance";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../comps/auth";
import { getDatabase, ref, onValue, set, update } from "firebase/database";

import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { getStorage } from "firebase/storage";

const ScreenUI = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #fff;
  min-height: 100%;
  width: 100%;
`;

const ContainerUI = styled.View`
  background-color: #fff;
  align-items: flex-start;
  justify-content: flex-start;
  width: 90%;
  min-height: 100%;
  position: relative;
  margin: 0 0 200px 0;
`;

const TitleUI = styled.Text`
  font-weight: normal;
  font-family: Poppins;
  font-size: 22px;
  margin: 15px 0;
`;

const FilterTextUI = styled.Text`
  font-weight: normal;
  font-family: Poppins;
  font-size: 18px;
  margin: 10px 0;
`;

const DetailsUI = styled.Text`
  font-size: 14px;
`;

const ImageContainerUI = styled.View`
  height: 140px;
  border-radius: 15px;
`;

const ImageUI = styled.Image`
  height: 140px;
  border-radius: 15px;
`;

const RowUI = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

/* let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_live_51JFU6sHU3r8RBID1vSR7F4f2PxHXMCPyeqTgb7gEnOoEKoQSZwlYxjcsn4yGMfwSwzszVyJIIWkBr5twqcEyI7nw00qkETIETp"
    );
  }
  return stripePromise;
}; */

export default function ShopMenu({ route, navigation }) {
  const { store } = route.params;

  const { cartTotal, setCartTotal, cart, setCart, addItemToCart } =
    useContext(CartContext);

  const [selection, setSelection] = useState("all");

  // filter menu
  const filterMenu = (menu) => {
    if (selection === "all") {
      return menu;
    } else {
      return menu.filter((item) => item.type === selection);
    }
  };

  const { currentAddress, curLng, curLat } = useContext(LocationContext);

  const [lng, setLong] = useState(null);
  const [lat, setLat] = useState(null);
  const [distance, setDistance] = useState(null);

  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey("AIzaSyBKDzfaPIYxv1yBdca_ldICCqRT_zTUqZY");

  // set response language. Defaults to english.
  Geocode.setLanguage("en");

  // Get latitude & longitude from address.
  Geocode.fromAddress(store.address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setLong(lng);
      setLat(lat);
    },
    (error) => {
      console.error(error);
    }
  );

  /*   console.log(lng);
  console.log(lat);
 */
  var config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${curLat}%2C${curLng}&destinations=${lat}%2C${lng}&key=AIzaSyBKDzfaPIYxv1yBdca_ldICCqRT_zTUqZY`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      /*       console.log(response.data.rows[0].elements[0].distance.text); */

      const distance = response.data.rows[0].elements[0].distance.text;
      setDistance(distance);
    })
    .catch(function (error) {
      console.log(error);
    });

  const win = Dimensions.get("window");

/*   const currentUser = useContext(AuthContext);
  const uid = currentUser.currentUser.uid;

  const [savedStores, setSavedStores] = useState(null);

  //firebase read user data (name, location, type)
  function readUserData(userId) {
    const menuRef = ref(db, "users/" + userId + "/favorite");

    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSavedStores(data);
        console.log(data);
      } else {
        update(ref(db, "users/" + uid + "/favorite"), {
          stores: [store.uid],
        });
      }
    });
  }

  //read user data on mount
  useEffect(() => {
    readUserData(uid);
  }, []); */

  const [saved, setSaved] = useState(false);

  const saveStore = () => {
    setSaved(!saved);
/*     console.log(savedStores.stores.filter(x => x === store.uid)) */
    
  };



  return (
    <>
      <ScreenUI>
        <Header navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <ContainerUI>
            <ImageContainerUI>
              <ImageUI
                source={{uri: store.img}}
                resizeMode={"cover"}
                style={{ width: win.width * 0.9 }}
              />
            </ImageContainerUI>

            <TitleUI>
              {store.username} - {store.location}
            </TitleUI>

            <RowUI style={{ width: win.width * 0.9 }}>
              <DetailsUI>{distance}</DetailsUI>
              <Pressable
                onPress={saveStore}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DetailsUI>Save Store</DetailsUI>
                {saved ? (
                  <AntDesign
                    style={{ marginLeft: 10 }}
                    name="heart"
                    size={24}
                    color="black"
                  />
                ) : (
                  <AntDesign
                    style={{ marginLeft: 10 }}
                    name="hearto"
                    size={24}
                    color="black"
                  />
                )}
              </Pressable>
            </RowUI>
            <MenuFilter
              selection={selection}
              setSelection={setSelection}
              win={win}
            />

            <FilterTextUI>{selection}</FilterTextUI>

            <View>
              {store.menu &&
                filterMenu(store.menu).map((item) => (
                  <ItemCard
                    key={item.name}
                    item={item}
                    navigation={navigation}
                  />
                ))}
            </View>
          </ContainerUI>
        </ScrollView>
      </ScreenUI>

      {cart.length > 0 ? (
        <CartButton navigation={navigation} store={store} />
      ) : (
        <></>
      )}
    </>
  );
}
