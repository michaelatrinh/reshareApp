// import React, { useState, useEffect } from 'react';
import * as React from "react";
// import { StyleSheet, Text, ReactNative.View, TouchableOpacity, Dimensions } from 'react-native';
import * as ReactNative from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { storage, getStorage, ref, uploadBytes } from "firebase/storage";

var deviceWidth = ReactNative.Dimensions.get("window").width; //full width
var deviceHeight = ReactNative.Dimensions.get("window").height; //full height

export default function PhoneCamera({ navigation }) {
  
  const cameraRef = React.useRef(null);

  const [hasPermission, setHasPermission] = React.useState(null);

  const [snappedImg, setSnappedImg] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);

  const [cameraSnap, setCameraSnap] = React.useState(null);

  // camera api asks phone permission to use phone's camera
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");

      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <ReactNative.View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // photo gallery access function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // function to snap a picture using camera
  const takePicture = async () => {
    if (cameraRef) {
      const picture = await cameraRef.current
        .takePictureAsync()
        .then((photo) => {
          setSnappedImg(photo);
          console.log(photo.uri);
          
          // // uploading photo to firebase storage
          // const { uri } = snappedImg;
          // const filename = uri.substring(uri.lastIndexOf('/') + 1);
          // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

          // setUploading(true);
          // setTransferred(0);

          // const task = storage()
          //   .ref(filename)
          //   .putFile(uploadUri);

          // // set progress state
          // task.on('state_changed', snapshot => {
          //   setTransferred(
          //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
          //   );
          // });

          // try {
          //   task;
          // } catch (e) {
          //   console.error(e);
          // }

          // setUploading(false);
          
          navigation.navigate("Add Item Details", { photoUri: photo.uri });
        });
    }
  };



  return (
    <ReactNative.View style={styles.container}>
      {/* actual camera component */}
      <ReactNative.View style={styles.viewFinder}>
        <Camera
          ref={cameraRef}
          // onCameraReady={()=>takePicture()}
          style={styles.camera}
          type={type}
          ratio={"1:1"}
        />

        {/* trying to test and see if image is saved in phone cache once photo is taken */}
        {/* {snappedImg && <Image source={{uri: snappedImg}} style={{
          flex: 1,
          position: "absolute",
          zIndex: 5,
        }}/>} */}
      </ReactNative.View>

      <ReactNative.View style={styles.bottomContainer}>
        {/* photo gallery */}
        <ReactNative.View style={styles.galleryContainer}>
          <ReactNative.TouchableOpacity>
            <AntDesign
              name="picture"
              size={35}
              color="white"
              onPress={pickImage}
            />
          </ReactNative.TouchableOpacity>
        </ReactNative.View>

        {/* snap picture button */}
        <ReactNative.View style={styles.snapBtnContainer}>
          <ReactNative.TouchableOpacity
            style={styles.snapBtnTouch}
            onPress={takePicture}
          >
            <ReactNative.View style={styles.snapBtnOutside}>
              <ReactNative.View style={styles.snapBtnInside} />
            </ReactNative.View>
          </ReactNative.TouchableOpacity>
        </ReactNative.View>

        {/* camera flip button */}
        <ReactNative.View style={styles.flipBtnContainer}>
          <ReactNative.TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Ionicons name="camera-reverse-outline" size={35} color="white" />
          </ReactNative.TouchableOpacity>
        </ReactNative.View>
      </ReactNative.View>
    </ReactNative.View>
  );
}

const styles = ReactNative.StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  camera: {
    flexGrow: 1,
    backgroundColor: "pink",
  },
  viewFinder: {
    flexGrow: 99,
    // height: deviceHeight * 0.75,
    maxHeight: deviceHeight * 0.66,
    backgroundColor: "pink",
  },
  bottomContainer: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  galleryContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  snapBtnContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  snapBtnTouch: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  snapBtnOutside: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  snapBtnInside: {
    width: 58,
    height: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    borderWidth: 2,
    position: "absolute",

    zIndex: 1,
  },
  flipBtnContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
