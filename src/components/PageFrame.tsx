import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, StyleSheet } from "react-native";
import { View } from "react-native";

type PageFrameProps = {
  children: React.ReactNode;
};

export default function PageFrame({ children }: PageFrameProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#a6c0fe", "#f68084"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.4, y: 1 }}
        style={styles.background}
      >
        <View style={styles.wrapper}>{children}</View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    paddingTop: (StatusBar.currentHeight ?? 0) + 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
