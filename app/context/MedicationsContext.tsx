import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Medication = {
  id: string;
  name: string;
  dose: string;
  quantity: string;
  frequencyHours: number;
  schedules?: string[];
  durationDays?: number;
  notes?: string;
};

type MedicationsContextType = {
  medications: Medication[];
  addMedication: (med: Omit<Medication, "id">) => Promise<void>;
  updateMedication: (id: string, med: Omit<Medication, "id">) => Promise<void>;
  removeMedication: (id: string) => Promise<void>;
  loading: boolean;
};

const MedicationsContext = createContext<MedicationsContextType | undefined>(
  undefined
);

const STORAGE_KEY = "@medications";

export const MedicationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setMedications(JSON.parse(saved));
        }
      } catch (e) {
        console.warn("Error loading medications", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const save = async (data: Medication[]) => {
    setMedications(data);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Error saving medications", e);
    }
  };

  const addMedication = async (med: Omit<Medication, "id">) => {
    const newMed: Medication = {
      id: Date.now().toString(),
      ...med,
    };
    await save([...medications, newMed]);
  };

  const updateMedication = async (id: string, med: Omit<Medication, "id">) => {
    const updated = medications.map((m) =>
      m.id === id ? { ...m, ...med } : m
    );
    await save(updated);
  };

  const removeMedication = async (id: string) => {
    const filtered = medications.filter((m) => m.id !== id);
    await save(filtered);
  };

  return (
    <MedicationsContext.Provider
      value={{
        medications,
        addMedication,
        updateMedication,
        removeMedication,
        loading,
      }}
    >
      {children}
    </MedicationsContext.Provider>
  );
};

export const useMedications = () => {
  const ctx = useContext(MedicationsContext);
  if (!ctx) {
    throw new Error("useMedications must be used inside MedicationsProvider");
  }
  return ctx;
};
