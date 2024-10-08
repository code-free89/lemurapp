import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";

type ButtonProps = {
  mode: "text" | "contained" | "outlined" | "elevated" | "contained-tonal";
  text: string;
  onPress: VoidFunction;
};

export default function CustomButton({ mode, text, onPress }: ButtonProps) {
  return (
    <Button mode={mode} onPress={onPress} style={styles.container}>
      <Text style={styles.label}>{text}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
});
