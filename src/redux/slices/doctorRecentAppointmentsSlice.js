import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  upcomingAppointments: "",
  completedAppointments: "",
  unreadMessages: "",
  appointmentsHistory: [],
};

const doctorRecentPatients = createSlice({
  name: "doctor-appointments",
  initialState,
  reducers: {
    setDoctorAppointments: (state, action) => {
      const {
        appointmentsHistory,
        upcomingAppointments,
        completedAppointments,
        unreadMessages,
      } = action.payload;
      state.appointmentsHistory = appointmentsHistory || [];
      state.upcomingAppointments = upcomingAppointments || "";
      state.completedAppointments = completedAppointments || "";
      state.unreadMessages = unreadMessages || "";
    },

    addDoctorAppointment: (state, action) => {
      state.appointmentsHistory.push(action.payload);
    },
    deleteDoctorAppointment: (state, action) => {
      state.appointmentsHistory = state.appointmentsHistory.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
    updateDoctorAppointment: (state, action) => {
      const index = state.appointmentsHistory.findIndex(
        (appointment) => appointment.id === action.payload.id
      );
      if (index !== -1) {
        state.appointmentsHistory[index] = {
          ...state.appointmentsHistory[index],
          ...action.payload.data,
        };
      }
    },
    clearDoctorAppointment: () => initialState,
  },
});

export const {
  setDoctorAppointments,
  addDoctorAppointment,
  deleteDoctorAppointment,
  updateDoctorAppointment,
  clearDoctorAppointment,
} = doctorRecentPatients.actions;
export default doctorRecentPatients.reducer;
