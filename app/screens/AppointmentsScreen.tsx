import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CallButton from "../components/CallButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Appointment,
  AppointmentDate,
  useAppointments,
} from "../context/AppointmentsContext";

type AppointmentSection = {
  title: string;
  data: Appointment[];
};

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

const getStatus = (status: Appointment["status"]) => {
  if (status === "pending") return "Pendiente";
  if (status === "completed") return "Completada";
  return "Cancelada";
};

const getStatusStyle = (status: Appointment["status"]) => {
  if (status === "pending") return styles.statusPending;
  if (status === "completed") return styles.statusCompleted;
  return styles.statusCancelled;
};

export default function AppointmentsScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  const { appointments, loading } = useAppointments();

  const sections: AppointmentSection[] = Object.values(
    appointments.reduce((acc, appointment) => {
      const key = getGroupMonth(appointment.date);
      if (!acc[key]) {
        acc[key] = { title: key, data: [] };
      }
      acc[key].data.push(appointment);
      return acc;
    }, {} as Record<string, AppointmentSection>)
  );
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando citas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis citas</Text>

      {appointments.length !== 0 ? (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Appointment Detail", { appointment: item })
              }
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={32}
                  style={styles.arrowIcon}
                />
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

                {/* <View style={styles.row}>
                <Ionicons name="location-outline" size={22} color="#000000" />
                <Text style={styles.place}>{item.place}</Text>
              </View> */}

                {/* {item.notes ? (
                <Text style={styles.notes}>Nota: {item.notes}</Text>
              ) : null} */}
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.subtextContainer}>
          <Text style={styles.subtext}>No hay citas registradas.</Text>
          <Text style={styles.subtext}>Empieza creando una cita.</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("New Appointment")}
      >
        <Text style={styles.createButtonText}>NUEVA CITA</Text>
      </TouchableOpacity>
      <CallButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 110,
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
    flexDirection: "row",
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
    paddingRight: 5,
  },
  arrowIcon: {
    color: "#000",
    fontSize: 40,
    paddingTop: 8,
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
  createButton: {
    position: "absolute",
    bottom: 50,
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
