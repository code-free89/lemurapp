import * as ScreenOrientation from "expo-screen-orientation";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";

type VideoPlayerProps = {
  src: { filename: string; link: string };
};

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  React.useEffect(() => {
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
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: src
            ? src.link
            : "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(status)}
        shouldPlay
      />
    </View>
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
