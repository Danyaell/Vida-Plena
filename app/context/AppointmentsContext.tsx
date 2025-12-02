import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AppointmentDate = {
  day: number;
  month: number;
  year: number;
  hour: string;
};

export type Appointment = {
  id: string;
  title: string;
  date: AppointmentDate;
  place?: string;
  doctor?: string;
  notes?: string;
  status: "pending" | "completed" | "canceled";
};

type AppointmentsContextType = {
  appointments: Appointment[];
  addAppointment: (a: Omit<Appointment, "id">) => Promise<void>;
  updateAppointment: (id: string, a: Omit<Appointment, "id">) => Promise<void>;
  removeAppointment: (id: string) => Promise<void>;
  loading: boolean;
};

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(
  undefined
);

const STORAGE_KEY = "@appointments";

export const AppointmentsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setAppointments(JSON.parse(saved));
        }
      } catch (e) {
        console.warn("Error loading appointments", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const save = async (data: Appointment[]) => {
    setAppointments(data);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Error saving appointments", e);
    }
  };

  const addAppointment = async (med: Omit<Appointment, "id">) => {
    const newMed: Appointment = {
      id: Date.now().toString(),
      ...med,
    };
    await save([...appointments, newMed]);
  };

  const updateAppointment = async (
    id: string,
    med: Omit<Appointment, "id">
  ) => {
    const updated = appointments.map((m) =>
      m.id === id ? { ...m, ...med } : m
    );
    await save(updated);
  };

  const removeAppointment = async (id: string) => {
    const filtered = appointments.filter((m) => m.id !== id);
    await save(filtered);
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        removeAppointment,
        loading,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const ctx = useContext(AppointmentsContext);
  if (!ctx) {
    throw new Error(
      "useAppointments must be used inside AppointmentsProvider"
    );
  }
  return ctx;
};
