import { MedicationsProvider } from "./context/MedicationsContext";
import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <MedicationsProvider>
      <AppNavigator />
      <StatusBar style="dark" />
    </MedicationsProvider>
  );
}
