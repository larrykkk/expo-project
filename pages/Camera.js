import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  Button,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export default function CameraPage() {
  //  camera permissions
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3"); // default is 4:3
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  // on screen  load, ask for permission to use the camera
  useEffect(() => {
    async function getCameraStatus() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status == "granted");
    }
    getCameraStatus();
  }, []);

  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
    let desiredRatio = "4:3"; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === "android") {
      const ratios = await camera.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder / 2);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  // the camera must be loaded in order to access the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  _takePictureButtonPressed = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo);
      downloadFile(photo.uri);
    }
  };

  downloadFile = async (uri) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      // 第一種
      // MediaLibrary.saveToLibraryAsync(uri);

      // 第二種
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }
  };

  const [photo, setPhoto] = useState(null);

  if (hasCameraPermission === null) {
    return (
      <View style={styles.information}>
        <Text>Waiting for camera permissions</Text>
      </View>
    );
  } else if (hasCameraPermission === false) {
    return (
      <View style={styles.information}>
        <Text>No access to camera</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* 
        We created a Camera height by adding margins to the top and bottom, 
        but we could set the width/height instead 
        since we know the screen dimensions
        */}
        <Camera
          style={[
            styles.cameraPreview,
            { marginTop: imagePadding, marginBottom: imagePadding },
            styles.camera,
          ]}
          onCameraReady={setCameraReady}
          ratio={ratio}
          ref={(ref) => {
            setCamera(ref);
          }}
        >
          <View style={styles.controls}>
            <Button
              title="Take photo"
              color="#ffffff"
              onPress={_takePictureButtonPressed}
            />

            {photo && <Image style={styles.photo} source={photo} />}
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    position: "relative",
  },

  camera: {
    flex: 1,
  },

  controls: {
    position: "absolute",
    zIndex: 10,
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  photo: {
    width: 100,
    height: 100,
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
  },
});
