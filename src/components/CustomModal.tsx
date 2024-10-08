import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Modal, StyleSheet } from "react-native";

type CustomModalProps = {
  visible: boolean;
  onRequestClose: VoidFunction;
  children: React.ReactNode;
};

export default function CustomModal({ visible, onRequestClose, children }: CustomModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
      presentationStyle="overFullScreen"
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000030",
    paddingHorizontal: 20,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    width: "100%",
  },
});
