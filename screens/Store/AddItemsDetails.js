import React, { useEffect, useState, useRef, useContext } from "react";
import * as ReactNative from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { AuthContext } from "../../comps/auth";
import { getDatabase, ref, onValue, set, update } from "firebase/database";

import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { getStorage } from "firebase/storage";

//components
import Picture from "../../comps/Store/AddItemPicture";
import TextInput from "../../comps/Store/AddItemTextInput";
import PriceInput from "../../comps/Store/AddItemPricesTextInput";
import DescInput from "../../comps/Store/AddItemDescriptionInput";
import PostBtn from "../../comps/Store/AddItemPostBtn";

var deviceWidth = ReactNative.Dimensions.get("window").width; //full width
var deviceHeight = ReactNative.Dimensions.get("window").height; //full height

export default function AddItemsDetails({ navigation, route }) {
  const { photoUri } = route.params;

  const currentUser = useContext(AuthContext);
  const uid = currentUser.currentUser.uid;

  const [itemName, setItemName] = React.useState("asda");
  const [itemExpiry, setItemExpiry] = React.useState("asda");
  const [itemDescription, setItemDescription] = React.useState("asdas");
  const [itemQuantity, setItemQuantity] = React.useState(10);
  const [itemOrigPrice, setItemOrigPrice] = React.useState(10);
  const [itemDiscPrice, setItemDiscPrice] = React.useState(10);

  const [menu, setMenu] = useState(null);

  //firebase read user data (name, location, type)
  function readUserData(userId) {
    const menuRef = ref(db, "stores/" + userId + "/menu");

    onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      setMenu(data);
    });
  }

  //read user data on mount
  useEffect(() => {
    readUserData(uid);
  }, []);

  useEffect(() => {
    if (menu) {
      handleUpdateInfo();
    } else {
      return;
    }
  }, [menu]);

  const handleUpdateInfo = () => {
    update(ref(db, "stores/" + uid), {
      menu: menu,
    });
  };

  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
    UbuntuBold: require("../../assets/fonts/Ubuntu/Ubuntu-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const addItem = () => {
    //menu reset//
    /* update(ref(db, "stores/" + uid ), {
      menu: [
        {
          description:
          "this is description about the ingredients! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        expiry: "11/17/2021",
        img: "https://firebasestorage.googleapis.com/v0/b/reshare-eb40c.appspot.com/o/orange.png?alt=media&token=47f37ae5-5164-4c6f-a800-f56a0c12c3c8",
        name: "Carrot",
        price: 0.25,
        priceog: 1,
        quantity: 8,
        type: "fruits",
        weight: "1PC (100g - 120g)",
        }
      ]
    }); */
    setMenu([
      ...menu,
      {
        description:
          "this is description about the ingredients! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        expiry: "11/17/2021",
        img: "https://firebasestorage.googleapis.com/v0/b/reshare-eb40c.appspot.com/o/orange.png?alt=media&token=47f37ae5-5164-4c6f-a800-f56a0c12c3c8",
        name: "Orange",
        price: 0.25,
        priceog: 1,
        quantity: 8,
        type: "fruits",
        weight: "1PC (100g - 120g)",
      },
    ]);

    navigation.navigate("Dashboard");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ReactNative.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewInside}
        centerContent={true}
        showsVerticalScrollIndicator={false}
      >
        <Picture photoUri={photoUri} />

        {/* Produce Title Section */}
        <TextInput header="TITLE" inputPlaceholder="Type title" />

        {/* Expiry Section */}
        <TextInput header="EXPIRY" inputPlaceholder="Select the expiry date" />

        {/* Quantity section */}
        <TextInput header="QUANTITY" inputPlaceholder="Type quantity" />

        {/* Price Section */}
        <PriceInput
          header1="ORIGINAL PRICE"
          header2="DISCOUNTED PRICE"
          inputPlaceholder1="Enter original price"
          inputPlaceholder2="Enter discounted price"
        />

        {/* Description Section */}
        <DescInput header="DESCRIPTION" inputPlaceholder="Enter description" />

        {/* Post Button */}
        <ReactNative.Pressable style={{ margin: 50 }} onPress={() => addItem()}>
          <ReactNative.Text>add</ReactNative.Text>
        </ReactNative.Pressable>
        {/* </ReactNative.View> */}
      </ReactNative.ScrollView>
    </SafeAreaView>
  );
}

const styles = ReactNative.StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flexGrow: 1,
    // minHeight: deviceHeight,
    // width: deviceWidth,
  },
  scrollViewInside: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",

    maxWidth: deviceWidth,
  },
  mainContentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: deviceHeight * 1.05,
    width: deviceWidth * 0.9,
  },
});
