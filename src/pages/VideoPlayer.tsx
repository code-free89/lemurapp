import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Brightness from "expo-brightness";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { ExternalKeyboardView } from "react-native-external-keyboard";
import { hideNavigationBar } from "react-native-navigation-bar-color";
import Loading from "../components/Loading";

import VideoPlayer from "../components/VideoPlayer";
import credentials from "../constants/credentials";
import S3 from "../S3";
import { RootStackParamList } from "../types/StackParams";

type PageProps = NativeStackScreenProps<RootStackParamList, "VideoPlayer">;

export default function VideoPlayerScreen({ navigation }: PageProps) {
  const aws_bucket = credentials.EXPO_PUBLIC_AWS_BUCKET;

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const [videos, setVideos] = useState([]);

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

  const loadVideos = async () => {
    const s3 = new S3();
    s3.listVideos(aws_bucket, "videos/")
      .then((ret: any) => {
        setVideos(ret);
        if (ret.length === 0) {
          Alert.alert("No videos found", "There is no video file.", [
            {
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
        }
      })
      .catch((err) => {})
      .finally(() => setIsVideoLoaded(true));
  };

  React.useEffect(() => {
    updateBrightnessAsync();
    loadVideos();
    hideNavigationBar();
  }, []);

  return isVideoLoaded ? (
    <>
      <VideoPlayer src={videos[videoIndex]} />
      <ExternalKeyboardView
        onKeyDownPress={(event) => {
          if (event.currentTarget == 78) {
            // n pressed
            if (videoIndex == videos.length - 1) setVideoIndex(0);
            else setVideoIndex((prev) => prev + 1);
          } else if (event.currentTarget == 66) {
            // b pressed
            if (videoIndex == 0) setVideoIndex(videos.length - 1);
            else setVideoIndex((prev) => prev - 1);
          }
        }}
        canBeFocused
      ></ExternalKeyboardView>
    </>
  ) : (
    <View style={{ width: "100%", height: "100%" }}>
      <Loading />
    </View>
  );
}
