import * as Brightness from "expo-brightness";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { hideNavigationBar } from "react-native-navigation-bar-color";
import { ResizeMode, Video } from "expo-av";

export default function AquariumVideoScreen() {
  const video = useRef<Video>(null);

  const updateBrightnessAsync = async () => {
    const currentPermission = await Brightness.getPermissionsAsync();
    let status = currentPermission.status;
    if (status != "granted") {
      const permission = await Brightness.requestPermissionsAsync();
      status = permission.status;
    }
    if (status === "granted") {
      Brightness.setSystemBrightnessAsync(1);
    }
  };

  React.useEffect(() => {
    updateBrightnessAsync();
    hideNavigationBar();

    (async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    })();

    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
  }, []);

  return (
    <Video
      ref={video}
      style={styles.video}
      source={require("../../assets/videos/fish_aquarium.mp4")}
      useNativeControls={false}
      resizeMode={ResizeMode.CONTAIN}
      isLooping
      shouldPlay
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
    backgroundColor: "black",
  },
});
