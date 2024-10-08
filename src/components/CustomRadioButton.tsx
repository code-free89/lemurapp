import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";

type RadioButtonProps = {
  label?: string;
  value: string;
  selectedValue: string;
  onPress: VoidFunction;
};

export default function CustomRadioButton({
  label = "",
  value,
  selectedValue,
  onPress,
}: RadioButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <RadioButton value={value} status={selectedValue === value ? "checked" : "unchecked"} />
      {!!label ? <Text style={styles.label}>{label}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
});
