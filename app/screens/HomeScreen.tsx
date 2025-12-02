import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CallButton from "../components/CallButton";
import { useEffect, useState } from "react";

export default function HomeScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  const WEEK_DAY = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const MONTHS = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function formatHour(date: Date) {
    let h = date.getHours();
    let m = date.getMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    const minStr = `${h}:${m < 10 ? "0" + m : m}`;
    return `${minStr} ${ampm}`;
  }

  function formatDate(date: Date) {
    const weekDay = WEEK_DAY[date.getDay()];
    const dayNumber = date.getDate();
    const month = MONTHS[date.getMonth()];

    return `${weekDay} ${dayNumber} de ${month}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{formatHour(now)}</Text>
      <Text style={styles.subtitle}>{formatDate(now)}</Text>

      <TouchableOpacity style={styles.reminderContainer} onPress={() => {}}>
        <View style={styles.reminderTextContainer}>
          <Text style={styles.reminderText}>Próximo recordatorio:</Text>
          <Text style={styles.reminderTitle}>"Pastilla para la presión"</Text>
          <Text style={styles.reminderText}>9:00 PM</Text>
        </View>
        <TouchableOpacity style={styles.reminderButton} onPress={() => {}}>
          <Text style={styles.reminderButtonText}>Tomar medicina</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Medications")}
      >
        <Text style={styles.buttonText}>Mis medicamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Appointments")}
      >
        <Text style={styles.buttonText}>Mis citas</Text>
      </TouchableOpacity>
      <CallButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
    color: "#0c56aaff",
  },
  subtitle: {
    fontSize: 25,
    marginBottom: 32,
    textAlign: "left",
    color: "#0c56aaff",
  },
  reminderContainer: {
    backgroundColor: "#11a358ff",
    marginBottom: 32,
    paddingVertical: 18,
    borderRadius: 36,
    alignItems: "center",
  },
  reminderTextContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "light",
    textAlign: "left",
  },
  reminderTitle: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 6,
  },
  reminderButton: {
    backgroundColor: "#FFFFFF",
    marginTop: 5,
    paddingVertical: 18,
    borderRadius: 35,
    alignItems: "center",
  },
  reminderButtonText: {
    fontSize: 30,
    paddingHorizontal: 40,
    color: "#11a358ff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0c56aaff",
    marginTop: 20,
    paddingVertical: 18,
    borderRadius: 35,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 30,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
