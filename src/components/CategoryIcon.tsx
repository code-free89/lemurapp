import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

type CategoryIconProps = {
  icon: any;
  onPress: VoidFunction;
  onLongPress: VoidFunction;
};

export default function CategoryIcon({ icon, onPress, onLongPress }: CategoryIconProps) {
  return (
    <TouchableOpacity style={style.link} onPress={() => onPress()} onLongPress={onLongPress}>
      {icon}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  link: {
    borderRadius: 9999,
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
