import { useEffect } from "react";
import { AppointmentsProvider } from "./context/AppointmentsContext";
import { MedicationsProvider } from "./context/MedicationsContext";
import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MedicationsProvider>
      <AppointmentsProvider>{children}</AppointmentsProvider>
    </MedicationsProvider>
  );
}

export default function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#ffffff");
    NavigationBar.setButtonStyleAsync("dark");
  }, [])
  return (
    <AppProviders>
      <AppNavigator />
      <StatusBar style="dark" />
    </AppProviders>
  );
}
