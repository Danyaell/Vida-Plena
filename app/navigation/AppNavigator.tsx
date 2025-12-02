import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MedicationsScreen from '../screens/MedicationsScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import NewMedicationScreen from '../screens/NewMedicationScreen';
import MedicationDetail from '../screens/MedicationDetailScreen';
import NewAppointmentScreen from '../screens/NewAppointmentScreen';
import AppointmentDetailScreen from '../screens/AppointmentDetailScreen';

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
          name="Medication Detail"
          component={MedicationDetail}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Appointments"
          component={AppointmentsScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="New Appointment"
          component={NewAppointmentScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Appointment Detail"
          component={AppointmentDetailScreen}
          options={{ title: '' }}
        />
      </Stack.Navigator>
  );
}
