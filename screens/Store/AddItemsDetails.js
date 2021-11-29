import React, { useEffect, useState, useRef, useContext, useCallback } from "react";
import * as ReactNative from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import DropDownPicker from 'react-native-dropdown-picker';

import { storage, getStorage, uploadBytes } from "firebase/storage";

import { AuthContext } from "../../comps/auth";
import { getDatabase, ref, onValue, set, update } from "firebase/database";

import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";

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

  // dropdown picker states
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [expiryOpen, setExpiryOpen] = React.useState(false);

  //close other drop down pickers if one is clicked open
  const onCategoryOpen = useCallback(() => {
    // setCategoryOpen(!categoryOpen);
    setExpiryOpen(false);
  }, []);
  const onExpiryOpen = useCallback(() => {
    // setExpiryOpen(true);
    setCategoryOpen(false);
  }, []);

  const [dateValue, setDateValue] = useState(null);
  // value is in format MMDDYYYY
  const [dates, setDates] = useState([
    { label: 'December 3, 2021', value: '12/03/2021' },
    { label: 'December 4, 2021', value: '12/04/2021' },
    { label: 'December 5, 2021', value: '12/05/2021' },
    { label: 'December 6, 2021', value: '12/06/2021' },
    { label: 'December 7, 2021', value: '12/07/2021' },
    { label: 'December 8, 2021', value: '12/08/2021' },
    { label: 'December 9, 2021', value: '12/09/2021' },
  ]);  
  const [categoryValue, setCategoryValue] = useState(null);
  const [categories, setCategories] = useState([
    { label: 'Fruits', value: 'Fruit' },
    { label: 'Vegetables', value: 'Vegetable' },
    { label: 'Dairy', value: 'Dairy' },
    { label: 'Grains', value: 'Grains' },
    { label: 'Canned', value: 'Canned' },
  ]);

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

  //fonts
  const [loaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    Ubuntu: require("../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
    UbuntuBold: require("../../assets/fonts/Ubuntu/Ubuntu-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const uploadImage = async () => {
    // const { uri } = {photoUri};
    const filename = photoUri.substring(photoUri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? photoUri.replace('file://', '') : uri;

    const task = storage()
      .ref(filename)
      .putFile(uploadUri)

    try {
      await task;
      addItem;
    } catch (e) {
      console.log(e);
    }
    
  };

  const addItem = () => {
    //menu reset//
    /* update(ref(db, "stores/" + uid ), {
      address: "4399 Lougheed Hwy., Burnaby, BC V5C 3Y7",
      email: "h@gmail.com",
      img: "https://firebasestorage.googleapis.com/v0/b/reshare-eb40c.appspot.com/o/stores%2Fsaveon.png?alt=media&token=5e804ef7-f431-4fcf-8f8f-84c120be4ef8",
      lat: 49.26703,
      lng: -123.0069,
      location: "Brentwood",
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
        },
      ]
    }); */
    setMenu([
      ...menu,
      {
        description: itemDescription,
        expiry: dateValue,
        img: "https://firebasestorage.googleapis.com/v0/b/reshare-eb40c.appspot.com/o/orange.png?alt=media&token=47f37ae5-5164-4c6f-a800-f56a0c12c3c8",
        name: itemName,
        price: itemDiscPrice,
        priceog: itemOrigPrice,
        quantity: itemQuantity,
        type: categoryValue,
        weight: "1PC (100g - 120g)",
      },
    ]);

    navigation.navigate("Dashboard");
  };

  return (
    <SafeAreaView 
      style={styles.safeArea} 
      edges={["left", "right"]}
    >
      <ReactNative.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewInside}
        centerContent={true}
        showsVerticalScrollIndicator={false}
      >
        <Picture photoUri={photoUri} />

        {/* Produce Title Section */}
        <ReactNative.View
          style={styles.textInputMainContainer} >
          <ReactNative.View 
            style={styles.textInputHeaderContainer} >
            <ReactNative.Text 
              style={styles.textInputHeader} >
                TITLE
            </ReactNative.Text>
          </ReactNative.View>

          <ReactNative.TextInput
            style={styles.textInput}
            placeholder="Type title"
            onChangeText={itemName => setItemName(itemName)} />
        </ReactNative.View>

        {/* Category Section */}
        <ReactNative.View
          style={styles.textInputMainContainer} >
            <ReactNative.View
              style={styles.textInputHeaderContainer} >
              <ReactNative.Text
                style={styles.textInputHeader} >
                  CATEGORY
              </ReactNative.Text>
            </ReactNative.View>

          <DropDownPicker
            style={styles.dropDown}
            containerStyle={styles.dropDownContainer}
            open={categoryOpen}
            value={categoryValue}
            items={categories}
            setOpen={setCategoryOpen}
            onOpen={onCategoryOpen}
            setValue={setCategoryValue}
            setItems={setCategories}
            placeholder="Select a produce category"
            placeholderStyle={{
              color: "#C7C7CD"
            }}
            textStyle={{
              color: "black"
            }}
            listItemLabelStyle={{
              color: "black"
            }}
            selectedItemLabelStyle={{
              color: "black"
            }}
            dropDownContainerStyle={{
              zIndex: 3,
            }}
            zIndex={3} />
        </ReactNative.View>

        {/* Expiry Section */}
        <ReactNative.View
          style={styles.textInputMainContainer} >
          <ReactNative.View 
            style={styles.textInputHeaderContainer} >
            <ReactNative.Text 
              style={styles.textInputHeader} >
                EXPIRY
            </ReactNative.Text>
          </ReactNative.View>
          
          <DropDownPicker
            style={styles.dropDown}
            containerStyle={styles.dropDownContainer}
            open={expiryOpen}
            value={dateValue}
            items={dates}
            setOpen={setExpiryOpen}
            onOpen={onExpiryOpen}
            setValue={setDateValue}
            setItems={setDates}
            placeholder="Select an expiry date"
            placeholderStyle={{
              color: "#C7C7CD"
            }}
            textStyle={{
              color: "black"
            }}
            listItemLabelStyle={{
              color: "black"
            }}
            selectedItemLabelStyle={{
              color: "black"
            }}
            zIndex={2} />
        </ReactNative.View>

        {/* Quantity section */}
        <ReactNative.View
          style={styles.textInputMainContainer} >
          <ReactNative.View
            style={styles.textInputHeaderContainer} >
            <ReactNative.Text
              style={styles.textInputHeader} >
                QUANTITY
            </ReactNative.Text>
          </ReactNative.View>

          <ReactNative.TextInput
            style={styles.textInput}
            placeholder="Type quantity"
            onChangeText={itemQuantity => setItemQuantity(itemQuantity)} />
        </ReactNative.View>

        {/* Price Section */}
        <ReactNative.View 
          style={styles.priceMainContainer} >
          
          {/* Original Price Input */}
          <ReactNative.View 
            style={styles.priceContainer} >
            <ReactNative.View 
              style={styles.priceHeaderContainer} >
              <ReactNative.Text 
                style={styles.textInputHeader} >
                  ORIGINAL PRICE
              </ReactNative.Text>
            </ReactNative.View>

            <ReactNative.TextInput
              style={styles.priceTextInput}
              placeholder="Enter original price"
              onChangeText={itemOrigPrice => setItemOrigPrice(itemOrigPrice)} />
          </ReactNative.View>

          {/* Discounted Price Input */}
          <ReactNative.View 
            style={styles.priceContainer} >
            <ReactNative.View 
              style={styles.priceHeaderContainer} >
              <ReactNative.Text 
                style={styles.textInputHeader} >
                  DISCOUNTED PRICE
              </ReactNative.Text>
            </ReactNative.View>

            <ReactNative.TextInput
              style={styles.priceTextInput}
              placeholder="Enter discounted price"
              onChangeText={itemDiscPrice => setItemDiscPrice(itemDiscPrice)} />
          </ReactNative.View>
        </ReactNative.View>

        {/* Description Section */}
        <ReactNative.View 
          style={styles.descMainContainer} >
          <ReactNative.View 
            style={styles.textInputHeaderContainer}>
            <ReactNative.Text 
              style={styles.textInputHeader} >
                DESCRIPTION
            </ReactNative.Text>
          </ReactNative.View>

          <ReactNative.TextInput
            style={styles.descTextInput}
            placeholder="Enter description"
            onChangeText={itemDescription => setItemDescription(itemDescription)}
            // defaultValue={itemDescription}
            // value={setItemDescription}
            multiline={true} />
        </ReactNative.View>

        {/* Post Button */}
        {/* <ReactNative.Pressable 
          style={{ margin: 50 }} 
          onPress={() => addItem()} >
          <ReactNative.Text>add</ReactNative.Text>
        </ReactNative.Pressable> */}
        <ReactNative.View 
          style={styles.postBtnMainContainer} >
          <ReactNative.TouchableOpacity
            style={styles.postBtn}
            // onPress={()=>addItem()} 
            onPress={()=>uploadImage()} >
            <ReactNative.Text 
              style={styles.textInputHeader} >
                POST
            </ReactNative.Text>
          </ReactNative.TouchableOpacity>
        </ReactNative.View>

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

  // text inputs
  textInputMainContainer: {
    width: "100%",
    height: 72,
    maxHeight: 72,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },
  textInputHeaderContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "90%",
  },
  textInputHeader: {
    fontFamily: "UbuntuBold",
    fontSize: 12,
  },
  textInput: {
    width: "90%",
    height: 49,
    maxHeight: 49,
    padding: 10,
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
  },

  //price inputs
  priceMainContainer: {
    width: "100%",
    height: 72,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 25,
  },
  priceContainer: {
    flexGrow: 1,
    minWidth: "50%",
    height: 72,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceHeaderContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "80%",
  },
  priceTextInput: {
    width: "80%",
    height: 49,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
  },

  //desc input
  descMainContainer: {
    width: "100%",
    height: 99,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },
  descTextInput: {
    width: "90%",
    height: 74,
    padding: 10,
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
  },

  //post btn
  postBtnMainContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: 100,
    margin: 33,
  },
  postBtn: {
    backgroundColor: "#DFEFB9",
    width: "40%",
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //drop down picker
  dropDownContainer: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    color: "#C7C7CD",
    zIndex: 2,
  },
  dropDown: {
    width: "100%",
    height: 49,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    zIndex: 2333,
    color: "#C7C7CD"
  },
});
