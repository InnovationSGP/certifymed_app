import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import patientAppointmentsReducer from "../slices/patientAppointments";
import doctorAppointmentsReducer from "../slices/doctorRecentAppointmentsSlice";
import patientTestsReducer from "../slices/patientsTestsSlice";
import doctorUpcomingAppointmentsReducer from "../slices/doctorUpcomingAppointmentsSlice";
import patientsInfo from "../slices/allPatientsForDoctorSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      patientDashboard: patientAppointmentsReducer,
      doctorDashboard: doctorAppointmentsReducer,
      patientsTests: patientTestsReducer,
      doctorUpcomingAppointments: doctorUpcomingAppointmentsReducer,
      allConcernedPatients: patientsInfo,
      isLoggedIn: true,
    },
  });
}

export const store = makeStore();
