import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CallButton from "../components/CallButton";

export default function HomeScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>6:40 PM</Text>
      <Text style={styles.subtitle}>Martes 25 de noviembre</Text>

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
