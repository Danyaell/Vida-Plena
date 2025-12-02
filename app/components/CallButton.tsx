import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  View,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";

export default function CallButton() {
  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const call = (number: string) => {
    close();
    Linking.openURL(`tel:${number}`);
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={open}>
        <Ionicons name="call" size={40} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable style={styles.overlay} onPress={close}></Pressable>

        <View style={styles.modal}>
          <Text style={styles.title}>Llamar a:</Text>

          <Pressable
            style={styles.emergenciesOption}
            onPress={() => call("911")}
          >
            <Ionicons name="medical" size={26} color="#FFF" />
            <Text style={styles.optionText}>Emergencias (911)</Text>
          </Pressable>

          <Pressable style={styles.option} onPress={() => call("5555555555")}>
            <Ionicons name="person" size={26} color="#FFF" />
            <Text style={styles.optionText}>Contacto de confianza</Text>
          </Pressable>

          <Pressable style={styles.cancel} onPress={close}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 50,
    right: 24,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#11a358ff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  emergenciesOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 12,
    backgroundColor: "#0c56aaff",
    borderRadius: 12,
    marginBottom: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 12,
    backgroundColor: "#11a358ff",
    borderRadius: 12,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 12,
  },
  cancel: {
    alignSelf: "center",
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelText: {
    fontSize: 25,
    color: "#9b0000ff",
  },
});
