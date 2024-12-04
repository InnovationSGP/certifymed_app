import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  // This patient array will contain objects representing all the info about patient such as
  // 1. Patient's info
  // 2. Appointments
  // 3. Notes
  // 4. Tests and Results
  filteredPatients: [], // this array will have all the filtered patients
};

const patientInfo = createSlice({
  name: "all-patients",
  initialState,
  reducers: {
    setPatients(state, action) {
      state.patients = action.payload;
      state.filteredPatients = action.payload;
    },
    addPatient(state, action) {
      state.patients.push(action.payload);
      state.filteredPatients = state.patients;
    },
    updatePatient(state, action) {
      const index = state.patients.findIndex(
        (patient) => patient.id === action.payload.id
      );
      if (index !== -1) {
        state.patients[index] = { ...state.patients[index], ...action.payload };
        state.filteredPatients = state.patients;
      }
    },
    removePatient(state, action) {
      state.patients = state.patients.filter(
        (patient) => patient.id !== action.payload
      );
      state.filteredPatients = state.patients;
    },
    searchPatientByName(state, action) {
      const query = action.payload.toLowerCase();
      state.filteredPatients = state.patients.filter((patient) =>
        patient.name.toLowerCase().includes(query)
      );
    },
    clearSearch(state) {
      state.filteredPatients = state.patients;
    },
  },
});

export const {
  setPatients,
  addPatient,
  updatePatient,
  removePatient,
  searchPatientByName,
  clearSearch,
} = patientInfo.actions;

export default patientInfo.reducer;
