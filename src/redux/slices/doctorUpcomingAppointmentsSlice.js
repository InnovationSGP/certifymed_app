import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  upcomingAppointments: [],
};

const doctorUpcomingAppointments = createSlice({
  name: "doctor-upcoming-appointments",
  initialState,
  reducers: {
    setDoctorUpcomingAppointments(state, action) {
      state.upcomingAppointments = action.payload;
    },
    addDoctorUpcomingAppointment(state, action) {
      state.upcomingAppointments.push(action.payload);
    },
    updateDoctorUpcomingAppointment(state, action) {
      const { id, updatedDetails } = action.payload;
      const index = state.upcomingAppointments.findIndex(
        (appt) => appt.id === id
      );
      if (index !== -1) {
        state.upcomingAppointments[index] = {
          ...state.upcomingAppointments[index],
          ...updatedDetails,
        };
      }
    },
    removeDoctorUpcomingAppointment(state, action) {
      const id = action.payload;
      state.upcomingAppointments = state.upcomingAppointments.filter(
        (appt) => appt.id !== id
      );
    },
    clearDoctorUpcomingAppointment(state) {
      state.upcomingAppointments = [];
    },
  },
});

export const {
  setDoctorUpcomingAppointments,
  addDoctorUpcomingAppointment,
  updateDoctorUpcomingAppointment,
  removeDoctorUpcomingAppointment,
  clearDoctorUpcomingAppointment,
} = doctorUpcomingAppointments.actions;

export default doctorUpcomingAppointments.reducer;
