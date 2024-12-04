import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingTestResults: "",
  upcomingTests: "",
  totalTestsDone: "",
  testHistory: [],
};

const patientTestHistory = createSlice({
  name: "patient-test-history",
  initialState,
  reducers: {
    setPatientTests: (state, action) => {
      state.pendingTestResults = action.payload.pendingTestResults;
      state.upcomingTests = action.payload.upcomingTests;
      state.totalTestsDone = action.payload.totalTestsDone;
      state.testHistory = action.payload.testHistory;
    },
    createPatientTest: (state, action) => {
      state.testHistory.push(action.payload);
    },
    deletePatientTest: (state, action) => {
      state.testHistory = state.testHistory.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
    updatePatientTest: (state, action) => {
      const index = state.testHistory.findIndex(
        (appointment) => appointment.id === action.payload.id
      );
      if (index !== -1) {
        state.testHistory[index] = {
          ...state.testHistory[index],
          ...action.payload.data,
        };
      }
    },
    clearPatientAlltests: () => initialState,
  },
});

export const {
  setPatientTests,
  createPatientTest,
  deletePatientTest,
  updatePatientTest,
  clearPatientAlltests,
} = patientTestHistory.actions;
export default patientTestHistory.reducer;
