import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMedications } from "../context/MedicationsContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function NewMedicationScreen({ navigation }: {
  navigation: NativeStackNavigationProp<any>;
}) {
  // THIS PAGE STILL IS A WORK IN PROGRESS
  // AND MAY NOT FUNCTION AS EXPECTED WITHOUT ADDITIONAL ADJUSTMENTS.
  // PLEASE TEST THOROUGHLY BEFORE USING.
  const { addMedication } = useMedications();

  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [frecuencyHours, setFrecuencyHours] = useState("");
  const [schedulesText, setSchedulesText] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Falta información", "Por favor, escribe el nombre del medicamento.");
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

      {/* Nombre */}
      <Text style={styles.label}>Nombre del medicamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Metformina"
        value={name}
        onChangeText={setName}
      />

      {/* Dosis */}
      <Text style={styles.label}>Dosis</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 850 mg"
        value={dose}
        onChangeText={setDose}
      />

      {/* Frecuencia */}
      <Text style={styles.label}>Frecuencia</Text>
      <TextInput
        style={styles.input}
        placeholder='Ej. 2 veces al día o "Cada 8 horas"'
        value={frecuencyHours}
        onChangeText={setFrecuencyHours}
      />

      {/* Horarios */}
      <Text style={styles.label}>Horarios (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder='Ej. 08:00, 20:00'
        value={schedulesText}
        onChangeText={setSchedulesText}
      />

      {/* Duración */}
      <Text style={styles.label}>Duración del tratamiento (días, opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 30"
        keyboardType="number-pad"
        value={durationDays}
        onChangeText={setDurationDays}
      />

      {/* Notas */}
      <Text style={styles.label}>Notas (opcional)</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Ej. Tomar después de comer."
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
      />

      {/* Botón guardar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name="save-outline" size={24} color="#FFFFFF" />
        <Text style={styles.saveButtonText}>Guardar medicamento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0c56aaff",
    textAlign: "left",
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
    color: "#333333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
    marginBottom: 14,
    backgroundColor: "#F9F9F9",
  },
  inputMultiline: {
    textAlignVertical: "top",
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
});
