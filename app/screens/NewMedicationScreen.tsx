import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMedications } from "../context/MedicationsContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function NewMedicationScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  const { addMedication } = useMedications();

  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [frecuencyHours, setFrecuencyHours] = useState("");
  const [schedulesText, setSchedulesText] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState("mg");

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert(
        "Falta información",
        "Por favor, escribe el nombre del medicamento."
      );
      return;
    }

    const schedules = schedulesText
      .split(",")
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    try {
      await addMedication({
        name: name.trim(),
        dose: dose.trim(),
        quantity: quantity.trim(),
        frequencyHours: parseInt(frecuencyHours.trim()) || 0,
        schedules: schedules.length > 0 ? schedules : undefined,
        durationDays: durationDays ? Number(durationDays) : undefined,
        notes: notes.trim() || undefined,
      });

      Alert.alert("Guardado", "El medicamento se guardó correctamente.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (e) {
      Alert.alert("Error", "Ocurrió un problema al guardar el medicamento.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nuevo medicamento</Text>

      <Text style={styles.label}>Nombre del medicamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Metformina"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Dosis</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.smallInput}
          placeholder="Ej. 850"
          value={dose}
          onChangeText={setDose}
        />
        <View>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => setOpen(true)}
          >
            <Text style={styles.buttonText}>{quantity}</Text>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>

          <Modal visible={open} transparent animationType="fade">
            <Pressable style={styles.overlay} onPress={() => setOpen(false)} />

            <View style={styles.menu}>
              <Pressable
                style={styles.option}
                onPress={() => {
                  setQuantity("mg");
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>mg</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setQuantity("ml");
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>ml</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setQuantity("tabletas");
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Tabletas</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setQuantity("píldoras");
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Píldoras</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setQuantity("gotas");
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Gotas</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      </View>

      <Text style={styles.label}>Frecuencia</Text>
      <View style={[styles.row, styles.alignCenter]}>
        <Text style={styles.formText}>Cada </Text>
        <TextInput
          style={styles.smallInput}
          placeholder="Ej. 24"
          value={frecuencyHours}
          onChangeText={setFrecuencyHours}
        />
        <Text style={styles.formText}> hora(s)</Text>
      </View>

      <Text style={styles.label}>Horarios (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 08:00, 20:00"
        value={schedulesText}
        onChangeText={setSchedulesText}
      />

      <Text style={styles.label}>
        Duración del tratamiento (días, opcional)
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 30"
        keyboardType="number-pad"
        value={durationDays}
        onChangeText={setDurationDays}
      />

      <Text style={styles.label}>Notas (opcional)</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Ej. Tomar después de comer."
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name="save-outline" size={24} color="#FFFFFF" />
        <Text style={styles.saveButtonText}>GUARDAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 50,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "left",
    color: "#0c56aaff",
  },
  label: {
    fontSize: 24,
    marginBottom: 6,
    color: "#0c56aaff",
    paddingTop: 8,
  },
  formText: {
    fontSize: 24,
    marginBottom: 14,
  },
  input: {
    width: "auto",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 24,
    marginBottom: 14,
    backgroundColor: "#F9F9F9",
  },
  inputMultiline: {
    textAlignVertical: "top",
  },
  smallInput: {
    width: "45%",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 24,
    marginBottom: 14,
    backgroundColor: "#F9F9F9",
  },
  smallButton: {
    width: "auto",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  buttonText: {
    fontSize: 24,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  menu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  option: {
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 25,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0c56aaff",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  alignCenter: {
    alignItems: "center",
  },
});
