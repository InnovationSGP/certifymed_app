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
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ["user/setUser", "user/updateUser"],
          // Ignore these paths in the state
          ignoredPaths: [
            "user.dateOfBirth",
            "user.createdAt",
            "user.updatedAt",
          ],
        },
      }),
  });
}

export const store = makeStore();
