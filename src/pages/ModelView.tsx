import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SwipeGesture } from "react-native-swipe-gesture-handler";
import Loading from "../components/Loading";
import credentials from "../constants/credentials";
import { useOrientation } from "../hooks/useOrientation";
import S3 from "../S3";
import { RootStackParamList } from "../types/StackParams";
import ViewerWV from "../ViewerWV";

type PageProps = NativeStackScreenProps<RootStackParamList, "ModelView">;

export default function ModelViewScreen({ route, navigation }: PageProps) {
  const s3 = new S3();
  const categoryType = route.params?.category;
  const models = route.params?.models;
  const isLandScapeMode = useOrientation();
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [injectedJSContent, setInjectedJSContent] = useState("");

  const aws_bucket = credentials.EXPO_PUBLIC_AWS_BUCKET;

  const onSwipePerformed = (action: string) => {
    switch (action) {
      case "left": {
        navigation.goBack();
        break;
      }
      case "right": {
        navigation.goBack();
        break;
      }
      case "up": {
        navigation.goBack();
        break;
      }
      case "down": {
        navigation.goBack();
        break;
      }
    }
  };

  useEffect(() => {
    if (categoryType === "upload_custom") {
      const jsContent = `window.VIEWER.app.uploadCustom();`;
      setInjectedJSContent(jsContent);

      setIsModelLoaded(true);
    } else if (categoryType == "view_multiple") {
      if (models) {
        const content = models.map((model) => ({
          filename: model,
          link: s3.getPreSignedUrl(aws_bucket, model),
        }));
        const webviewContent = {
          viewMultiple: true,
          objs: content,
        };
        const jsContent = `window.VIEWER.app.loadExternal(${JSON.stringify(
          webviewContent
        )});`;
        setInjectedJSContent(jsContent);
      } else {
        setInjectedJSContent("");
      }
      setIsModelLoaded(true);
    } else if (categoryType == "view_all") {
      s3.listModels(aws_bucket, "glb/", "all")
        .then((ret: any) => {
          if (ret.length === 0) {
            Alert.alert(
              "No assets found",
              "There are no assets matched with selected category",
              [
                {
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ]
            );
            setInjectedJSContent("");
          }
          const jsContent = `window.VIEWER.app.loadAllShuffle(${JSON.stringify(
            ret
          )});`;
          setInjectedJSContent(jsContent);
        })
        .catch((err) => {
          setInjectedJSContent("");
        })
        .finally(() => setIsModelLoaded(true));
    } else {
      s3.listModels(aws_bucket, "glb/", categoryType)
        .then((ret: any) => {
          if (ret.length === 0) {
            Alert.alert(
              "No assets found",
              "There are no assets matched with selected category",
              [
                {
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ]
            );
            setInjectedJSContent("");
          }
          const jsContent = `window.VIEWER.app.loadExternal(${JSON.stringify(
            ret
          )});`;
          setInjectedJSContent(jsContent);
        })
        .catch((err) => {
          setInjectedJSContent("");
        })
        .finally(() => setIsModelLoaded(true));
    }
  }, [categoryType]);

  useEffect(() => {
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
      {isModelLoaded ? (
        <ViewerWV
          injectedJavaScript={injectedJSContent}
          fullScreen={isLandScapeMode}
        />
      ) : (
        <View style={{ width: "100%", height: "100%" }}>
          <Loading />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  note: {
    paddingVertical: 20,
    marginTop: 10,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
