import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Linking,
  View,
  FlatList,
  Alert,
} from "react-native";
import CategoryIcon from "../components/CategoryIcon";
import { RootStackParamList } from "../types/StackParams";

type PageProps = NativeStackScreenProps<RootStackParamList, "CategoryList">;

export default function CategoryListScreen({ navigation }: PageProps) {
  const itemData = [
    {
      icon: (
        <Image
          source={require("../../assets/icons/category/animals.jpeg")}
          style={styles.image}
        />
      ),
      onPress: () => navigation.push("ModelView", { category: "animals" }),
      onLongPress: () => Alert.alert("", "Curated 3D assets for animal"),
    },
    {
      icon: (
        <Image
          source={require("../../assets/icons/category/architecture.jpeg")}
          style={styles.image}
        />
      ),
      onPress: () => navigation.push("ModelView", { category: "architecture" }),
      onLongPress: () => Alert.alert("", "Curated 3D assets for architecture"),
    },
    {
      icon: (
        <Image
          source={require("../../assets/icons/category/cultural.jpeg")}
          style={styles.image}
        />
      ),
      onPress: () => navigation.push("ModelView", { category: "history" }),
      onLongPress: () => Alert.alert("", "Curated 3D assets for history"),
    },
    {
      icon: (
        <Image
          source={require("../../assets/icons/category/fossils.jpeg")}
          style={styles.image}
        />
      ),
      onPress: () => navigation.push("ModelView", { category: "art" }),
      onLongPress: () => Alert.alert("", "Curated 3D assets for art"),
    },
    {
      icon: (
        <Image
          source={require("../../assets/icons/category/implement_yore.jpeg")}
          style={styles.image}
        />
      ),
      onPress: () =>
        navigation.push("ModelView", { category: "science_technology" }),
      onLongPress: () =>
        Alert.alert("", "Curated 3D assets for science and technology"),
    },
    {
      icon: (
        <Image
          source={require("../../assets/icons/category/multiple_models.jpeg")}
          style={styles.image}
        />
      ),
      onPress: () => navigation.push("ModelList"),
      onLongPress: () =>
        Alert.alert(
          "Multiple",
          "View a panel of 2 or more 3D model files on the same screen"
        ),
    },
    {
      icon: (
        <Image
          source={require("../../assets/icons/category/video.jpeg")}
          style={styles.image}
        />
      ),
      onPress: () => navigation.push("VideoPlayer"),
      onLongPress: () =>
        Alert.alert(
          "Video",
          "Learn the broad array of use-cases for the LemurBox!"
        ),
    },
    {
      icon: (
        <Image
          source={require("../../assets/icons/category/upload_custom.jpeg")}
          style={styles.image}
        />
      ),
      onPress: () =>
        navigation.push("ModelView", { category: "upload_custom" }),
      onLongPress: () =>
        Alert.alert(
          "Custom Uploaded",
          "Display your own glb files from your device"
        ),
    },
    {
      icon: (
        <Image
          source={require("../../assets/icons/category/youtube.jpeg")}
          style={styles.image}
        />
      ),
      onPress: () => {
        Linking.canOpenURL(
          "vnd.youtube://playlist?list=PLI7aE9BU7Ou555rILc2TW8ZqJNegeYvm6"
        ).then((supported) => {
          if (supported) {
            return Linking.openURL(
              "vnd.youtube://playlist?list=PLI7aE9BU7Ou555rILc2TW8ZqJNegeYvm6"
            );
          } else {
            return Linking.openURL(
              "https://www.youtube.com/playlist?list=PLI7aE9BU7Ou555rILc2TW8ZqJNegeYvm6"
            );
          }
        });
      },
      onLongPress: () =>
        Alert.alert(
          "Youtube",
          "Play pre-selected videos from our LemurTube playlist!"
        ),
    },
    {
      icon: (
        <Image
          source={require("../../assets/icons/category/aquarium.jpeg")}
          style={styles.image}
        />
      ),
      onPress: () => navigation.push("AquariumMode"),
      onLongPress: () =>
        Alert.alert(
          "Aquarium Video",
          "Play an aquarium of a fish in a tank on loop"
        ),
    },
    {
      icon: (
        <Image
          source={require("../../assets/icons/category/infinite.jpeg")}
          style={styles.image}
        />
      ),
      onPress: () => navigation.push("ModelView", { category: "view_all" }),
      onLongPress: () =>
        Alert.alert(
          "Infinite Loop",
          "Display glb files in a loop in a random order"
        ),
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={itemData}
        numColumns={2}
        renderItem={({ item, index }) => (
          <CategoryIcon
            key={index}
            icon={item.icon}
            onPress={() => item.onPress()}
            onLongPress={item.onLongPress}
          />
        )}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          marginVertical: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    borderRadius: 64,
    borderWidth: 2,
    borderColor: "#6c6c6c",
    marginHorizontal: 16,
    marginTop: 40,
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    margin: "auto",
  },
});
