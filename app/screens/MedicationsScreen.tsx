import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CallButton from "../components/CallButton";
import { useMedications } from "../context/MedicationsContext";

type Medication = {
  id: string;
  name: string;
  dose: string;
  frequencyhours: number;
  schedules?: string[];
  durationDays?: number;
  notes?: string;
};

const DATA: Medication[] = [
  {
    id: "1",
    name: "Metformina",
    dose: "850 mg",
    frequencyhours: 12,
    schedules: ["08:00", "20:00"],
    durationDays: 30,
    notes: "Tomar con alimentos.",
  },
  {
    id: "2",
    name: "Losartán",
    dose: "50 mg",
    frequencyhours: 24,
    schedules: ["08:00", "20:00"],
    durationDays: 30,
    notes: "Tomar antes de dormir.",
  },
];

export default function MedicationsScreen() {
  const { medications, loading } = useMedications();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando medicamentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis medicamentos</Text>

      {medications.length !== 0 ? (
        <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>{item.dose}</Text>
              <Text style={styles.text}>Cada {item.frequencyhours} hrs</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={32}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        )}
      />
      ) : (
        <View style={styles.subtextContainer}>
          <Text style={styles.subtext}>No hay medicamentos registrados.</Text>
          <Text style={styles.subtext}>Empieza creando un medicamento.</Text>
        </View>
      )}
      <TouchableOpacity style={styles.createButton} onPress={() => {}}>
        <Text style={styles.createButtonText}>NUEVO MEDICAMENTO</Text>
      </TouchableOpacity>
      <CallButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "left",
    color: "#0c56aaff",
  },
  subtextContainer: {
    paddingVertical: 50,
    paddingHorizontal: 10,
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#f0f0f0ff",
    borderRadius: 30,
  },
  subtext: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "500",
    color: "#646464ff",
    textAlign: "center",
  },
  card: {
    padding: 16,
    borderRadius: 25,
    marginBottom: 12,
    backgroundColor: "#0c56aaff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {},
  name: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#FFFFFF",
  },
  text: {
    fontSize: 23,
    color: "#FFFFFF",
  },
  arrowIcon: {
    color: "#FFFFFF",
    fontSize: 50,
  },
  createButton: {
    position: "absolute",
    bottom: 40,
    left: 24,
    width: 240,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#0c56aaff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  createButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
