import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppointments } from "../context/AppointmentsContext";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function NewAppointmentScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  const { addAppointment } = useAppointments();

  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [place, setPlace] = useState("");
  const [doctor, setDoctor] = useState("");
  const [notes, setNotes] = useState("");

  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert(
        "Falta información",
        "Por favor, escribe el nombre de la cita."
      );
      return;
    }
    const date = {
      day: parseInt(day) || 0,
      month: month,
      year: parseInt(year) || 0,
      hour: hour.trim(),
    };

    try {
      await addAppointment({
        title: title.trim(),
        date: date,
        place: place.trim() || undefined,
        doctor: doctor.trim() || undefined,
        notes: notes.trim() || undefined,
        status: "pending",
      });

      Alert.alert("Guardado", "La cita se guardó correctamente.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (e) {
      Alert.alert("Error", "Ocurrió un problema al guardar la cita.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nueva cita</Text>

      <Text style={styles.label}>Nombre de la cita:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Revisión médica general"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Fecha:</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.smallInput}
          placeholder="DD"
          value={day}
          onChangeText={setDay}
        />
        <View>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => setOpen(true)}
          >
            <Text style={styles.buttonText}>{MONTHS[month - 1]}</Text>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>

          <Modal visible={open} transparent animationType="fade">
            <Pressable style={styles.overlay} onPress={() => setOpen(false)} />

            <View style={styles.menu}>
              <Pressable
                style={styles.option}
                onPress={() => {
                  setMonth(1);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Enero</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setMonth(2);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Febrero</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setMonth(3);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Marzo</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setMonth(4);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Abril</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setMonth(5);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Mayo</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setMonth(6);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Junio</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setMonth(7);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Julio</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setMonth(8);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Agosto</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setMonth(9);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Septiembre</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setMonth(10);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Octubre</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setMonth(11);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Noviembre</Text>
              </Pressable>

              <Pressable
                style={styles.option}
                onPress={() => {
                  setMonth(12);
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>Diciembre</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
        <TextInput
          style={styles.smallInput}
          placeholder="AAAA"
          value={year}
          onChangeText={setYear}
        />
      </View>

      <Text style={styles.label}>Hora:</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Ej. 04:00 PM"
        value={hour}
        onChangeText={setHour}
      />

      <Text style={styles.label}>Lugar (opcional):</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Ej. Hospital general"
        value={place}
        onChangeText={setPlace}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Médico (opcional)</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Ej. Dr. Juan Pérez"
        value={doctor}
        onChangeText={setDoctor}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Notas (opcional)</Text>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Ej. Ir en ayunas."
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
    width: "25%",
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
