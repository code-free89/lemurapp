import { StyleSheet } from "react-native";
import { ActivityIndicator, Text, View, Image } from "react-native";

type Props = {
  color?: string;
  text?: string;
  size?: "large" | "small";
};

export default function Loading({ color = "white", text = "", size = "large" }: Props) {
  return !!text ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={color} size={size} />
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  ) : (
    <Image source={require("../../assets/upload.gif")} style={{ width: "100%", height: "100%" }} />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { color: "white", fontSize: 20, paddingVertical: 20 },
});
