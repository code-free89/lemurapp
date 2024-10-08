import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { useState } from "react";

export const useOrientation = () => {
  const [isLandScapeMode, setIsLandScapeMode] = useState(false);
  
  const trackOrientationState = (state: ScreenOrientation.Orientation) => {
    const landscapeMode =
      state != ScreenOrientation.Orientation.PORTRAIT_UP &&
      state != ScreenOrientation.Orientation.PORTRAIT_DOWN;
    setIsLandScapeMode(landscapeMode);
  };

  React.useEffect(() => {
    // find out initial orientation
    ScreenOrientation.getOrientationAsync().then((info) => {
      trackOrientationState(info);
    });

    // listen to orientation changes
    const subscription = ScreenOrientation.addOrientationChangeListener((e) => {
      trackOrientationState(e.orientationInfo.orientation);
    });

    // return a clean up function to unsubscribe from notifications
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return isLandScapeMode;
};
