import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MedicationsScreen from '../screens/MedicationsScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import NewMedicationScreen from '../screens/NewMedicationScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Medications"
          component={MedicationsScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="New Medication"
          component={NewMedicationScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Appointments"
          component={AppointmentsScreen}
          options={{ title: '' }}
        />
      </Stack.Navigator>
  );
}
