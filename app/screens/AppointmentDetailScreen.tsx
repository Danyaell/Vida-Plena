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
import { Appointment, useAppointments } from "../context/AppointmentsContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type RouteParams = {
  AppointmentDetail: {
    appointment: Appointment;
  };
};

type AppointmentDetailRouteProp = RouteProp<RouteParams, "AppointmentDetail">;

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

export default function AppointmentDetailScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  const route = useRoute<AppointmentDetailRouteProp>();
  const { appointment } = route.params;
  const [isEditing, setIsEditing] = useState(false);

  const { updateAppointment, removeAppointment } = useAppointments();

  const [title, setTitle] = useState(appointment.title);
  const [day, setDay] = useState(appointment.date.day.toString());
  const [month, setMonth] = useState(appointment.date.month);
  const [year, setYear] = useState(appointment.date.year.toString());
  const [hour, setHour] = useState(appointment.date.hour);
  const [place, setPlace] = useState(appointment.place || "");
  const [doctor, setDoctor] = useState(appointment.doctor || "");
  const [notes, setNotes] = useState(appointment.notes || "");

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
      await updateAppointment(appointment.id, {
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

  const handleDelete = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar esta cita?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            removeAppointment(appointment.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isEditing ? (
        <TextInput
          style={[styles.titleInput, styles.inputMultiline]}
          placeholder="Ej. Consulta"
          value={title}
          onChangeText={setTitle}
          multiline
          numberOfLines={3}
        />
      ) : (
        <Text style={styles.title}>{appointment.title}</Text>
      )}

      <Text style={styles.label}>Fecha:</Text>
      {isEditing ? (
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
              <Pressable
                style={styles.overlay}
                onPress={() => setOpen(false)}
              />

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
      ) : (
        <Text style={styles.text}>
          {appointment.date.day} de {appointment.date.month} de{" "}
          {appointment.date.year}
        </Text>
      )}

      <Text style={styles.label}>Hora:</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Ej. 04:00 PM"
          value={hour}
          onChangeText={setHour}
        />
      ) : (
        <Text style={styles.text}>{appointment.date.hour}</Text>
      )}

      {isEditing ? (
        <View>
          <Text style={styles.label}>Lugar (opcional):</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Ej. Hospital general"
            value={place}
            onChangeText={setPlace}
            multiline
            numberOfLines={3}
          />
        </View>
      ) : (
        appointment.place && (
          <View>
            <Text style={styles.label}>Lugar:</Text>
            <Text style={styles.text}>{appointment.place}</Text>
          </View>
        )
      )}

      {isEditing ? (
        <View>
          <Text style={styles.label}>Médico (opcional):</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Ej. Dr. Juan Pérez"
            value={doctor}
            onChangeText={setDoctor}
            multiline
            numberOfLines={3}
          />
        </View>
      ) : (
        appointment.doctor && (
          <View>
            <Text style={styles.label}>Médico:</Text>
            <Text style={styles.text}>{appointment.doctor}</Text>
          </View>
        )
      )}

      {isEditing ? (
        <View>
          <Text style={styles.label}>Notas (opcional):</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Ej. Tomar después de comer."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>
      ) : (
        appointment.notes && (
          <View>
            <Text style={styles.label}>Notas:</Text>
            <Text style={styles.text}>{appointment.notes}</Text>
          </View>
        )
      )}

      {isEditing ? (
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsEditing(false)}
          >
            <Text style={styles.saveButtonText}>CANCELAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons name="save-outline" size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>GUARDAR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Ionicons name="create-outline" size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>EDITAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete()}
          >
            <Ionicons name="trash-outline" size={24} color="#aa0c0cff" />
            <Text style={styles.deleteButtonText}>ELIMINAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
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
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
  },
  text: {
    fontSize: 24,
    paddingLeft: 15,
    paddingBottom: 10,
    marginBottom: 14,
  },
  formText: {
    fontSize: 24,
    marginBottom: 14,
  },
  titleInput: {
    width: "100%",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "left",
    color: "#0c56aaff",
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
    textAlign: "center",
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
  cancelButton: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aa0c0cff",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 10,
  },
  saveButton: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0c56aaff",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 10,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0c56aaff",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 10,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffffff",
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
  deleteButtonText: {
    fontSize: 20,
    color: "#aa0c0cff",
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
