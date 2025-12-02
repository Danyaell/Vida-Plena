# Welcome to Vida Plena 👋


This is an university students mobile application built with React Native & Expo.

## Overview

This mobile application is designed specifically for older adults, helping them manage their medications, medical appointments, and providing a quick emergency call button for safety.
The interface is optimized to be simple, readable, high-contrast, and easy to use, with large text and clear visual hierarchy.

This project was developed as part of the Business Linkage (Vinculación Empresarial) course, with social impact as its core purpose.

## 🚀 Technologies Used

- React Native (Expo managed workflow)
- TypeScript
- React Navigation (stack navigation)
- AsyncStorage (local data persistence)
- expo-notifications (local push notifications)
- expo-navigation-bar (system bar customization)
- expo-linking (phone calls)
- expo-vector-icons (iconography)

## Main Features
### ✔️ Medication Management

- Full list of user-added medications.
- Create medications with:
   - Name
   - Dosage
   - Frequency
   - Daily schedules
   - Treatment duration
   - Notes
- Detailed per-medication view.
- Local persistence using AsyncStorage (data remains after closing the app).

### ✔️ Medical Appointments

- List grouped by month (e.g., November 2025).
- Clear details: date, time, type, doctor, location, notes.
- Useful for tracking doctor visits and checkups.

### ✔️ Automatic Reminders

- Local notifications powered by expo-notifications.
- Automatically scheduled based on medication schedules.
- Work even if the app is closed.

### ✔️ Floating Emergency Call Button

- A persistent button visible across the entire app that opens a modal with quick-call options:
- Emergency services (911)
- Trusted contact
- Doctor (configurable)
- Designed to be highly visible and easy to press.

### ✔️ Accessible Design for Seniors

- Large fonts
- Large tappable buttons
- High-contrast colors
- Minimal cognitive load
- Simple, predictable navigation
- Clear layout and spacing

```
app/
 ├── components/
 │    └── CallButton.tsx                 # Floating emergency call button
 │
 ├── context/
 │    ├── MedicationsContext.tsx         # Medication data + persistence
 │    └── AppointmentsContext.tsx        # Appointment data + persistence
 │
 ├── screens/
 │    ├── HomeScreen.tsx
 │    ├── MedicamentosScreen.tsx
 │    ├── NewMedicationScreen.tsx
 │    ├── MedicationDetailScreen.tsx
 │    ├── AppointmentsScreen.tsx
 │    ├── NewAppointmentScreen.tsx
 │    └── AppointmentDetailScreen.tsx
 │
 ├── navigation/
 │    └── AppNavigator.tsx
 │
 └── utils/
      └── (date formatting, helpers, etc.)
```

## Get started

### 1. Clone the repository
   ```
   git clone https://github.com/Danyaell/Vida-Plena.git
   ```

### 2. Install dependencies

   ```bash
   npm install
   ```

### 3. Start the app

   ```bash
   npx expo start
   ```

## 🧠 Accessibility & UX Considerations

To support senior users, the app includes:

- Minimum font sizes between 18–22 px
- High-contrast backgrounds
- Large touch areas
- Simplified form fields
- Avoidance of clutter and unnecessary screens
- Clear section titles and consistent layout

## 🌱 Social Purpose

The application aims to promote independence, safety, and wellbeing for older adults by:

- Supporting medication adherence
- Keeping track of medical appointments
- Providing immediate access to emergency contacts

It reflects the project’s goals of:

- Ethical responsibility
- Community support
- Applying technical knowledge to real-world problems

## 📝 License

Academic project — free for educational use.

## 👤 Author

```
Danyaell Martínez Ortíz
Computer Engineering Student – UNAM FES Aragón
Fullstack Developer
Project for the course Business Linkage (Vinculación Empresarial)
```
