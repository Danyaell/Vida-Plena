import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SectionList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CallButton from "../components/CallButton";

type AppointmentDate = {
  day: number;
  month: number;
  year: number;
  hour: string;
};

type Appointment = {
  id: string;
  date: AppointmentDate;
  doctor: string;
  title: string;
  place: string;
  notes?: string;
  status: "pendiente" | "completada" | "cancelada";
};

type AppointmentSection = {
  title: string;
  data: Appointment[];
};

const CITAS_MOCK: Appointment[] = [
  {
    id: "1",
    date: {
      day: 24,
      month: 11,
      year: 2025,
      hour: "10:30 a.m.",
    },
    doctor: "Dr. Juan Pérez",
    title: "Consulta general",
    place: "Clínica Familiar #12",
    notes: "Llevar lista de medicamentos.",
    status: "pendiente",
  },
  {
    id: "2",
    date: {
      day: 26,
      month: 11,
      year: 2025,
      hour: "4:00 p.m.",
    },
    doctor: "Dra. Ana López",
    title: "Cardiología",
    place: "Hospital Central",
    status: "pendiente",
  },
  {
    id: "3",
    date: {
      day: 20,
      month: 12,
      year: 2025,
      hour: "9:00 a.m.",
    },
    doctor: "Dr. Ramírez",
    title: "Análisis de laboratorio",
    place: "Laboratorio SaludPlus",
    status: "completada",
  },
];

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

function longDateFormat(fecha: AppointmentDate) {
  const nombreMes = MONTHS[fecha.month - 1];
  return `${fecha.day} de ${nombreMes}`;
}

function getGroupMonth(fecha: AppointmentDate) {
  const nombreMes = MONTHS[fecha.month - 1];
  return `${nombreMes} ${fecha.year}`;
}

const sections: AppointmentSection[] = Object.values(
  CITAS_MOCK.reduce((acc, cita) => {
    const key = getGroupMonth(cita.date);
    if (!acc[key]) {
      acc[key] = { title: key, data: [] };
    }
    acc[key].data.push(cita);
    return acc;
  }, {} as Record<string, AppointmentSection>)
);

const getStatus = (status: Appointment["status"]) => {
  if (status === "pendiente") return "Pendiente";
  if (status === "completada") return "Completada";
  return "Cancelada";
};

const getStatusStyle = (status: Appointment["status"]) => {
  if (status === "pendiente") return styles.statusPending;
  if (status === "completada") return styles.statusCompleted;
  return styles.statusCancelled;
};

export default function AppointmentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis citas</Text>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>

            <View style={styles.details}>
              <View style={styles.dateRow}>
                <Ionicons
                  name="time-outline"
                  size={32}
                  style={styles.timeIcon}
                />
                <View style={styles.dateTexts}>
                  <Text style={styles.date}>{longDateFormat(item.date)}</Text>
                  <Text style={styles.hour}>{item.date.hour}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <Ionicons name="location-outline" size={22} color="#000000" />
                <Text style={styles.place}>{item.place}</Text>
              </View>

              {item.notes ? (
                <Text style={styles.notes}>Nota: {item.notes}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        )}
      />
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
  sectionHeader: {
    fontSize: 30,
    marginTop: 12,
    marginBottom: 6,
	borderBottomColor: "#dbdbdbff",
	borderBottomWidth: 1,
    color: "#8a8a8aff",
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#000000ff",
    marginBottom: 4,
  },
  details: {
    paddingTop: 4,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
	backgroundColor: "#0c56aaff",
	padding: 10,
	paddingHorizontal: 20,
	borderRadius: 45,
  },
  timeIcon: {
    color: "#ffffffff",
	paddingRight: 8,
  },
  dateTexts: {
    marginLeft: 8,
  },
  date: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffffff",
  },
  hour: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffffff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  place: {
    fontSize: 22,
    marginLeft: 4,
    color: "#000000ff",
  },
  notes: {
    fontSize: 20,
    marginTop: 4,
    color: "#555555",
  },
  statusPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  statusPending: {
    backgroundColor: "#E67E22",
  },
  statusCompleted: {
    backgroundColor: "#27AE60",
  },
  statusCancelled: {
    backgroundColor: "#C0392B",
  },
});
