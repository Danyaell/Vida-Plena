import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DATA = [
  {
    id: "1",
    nombre: "Metformina",
    dosis: "850 mg",
    frecuencia: "2 veces al día",
  },
  { id: "2", nombre: "Losartán", dosis: "50 mg", frecuencia: "1 vez al día" },
];

export default function MedicationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis medicamentos</Text>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.textContainer}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.text}>{item.dosis}</Text>
              <Text style={styles.text}>{item.frecuencia}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={32} style={styles.arrowIcon} />
          </TouchableOpacity>
        )}
      />
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
  card: {
    padding: 16,
    borderRadius: 25,
    marginBottom: 12,
    backgroundColor: "#0c56aaff",
	flexDirection: "row",
	justifyContent: "space-between",
	alignItems: "center",
  },
  textContainer: {
	
  },
  nombre: {
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
  }
});
