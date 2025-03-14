import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    upcomingAppointments: '',
    completedAppointments: '',
    unreadMessages: '',
    appointmentsHistory: [],
    isLoading: true // Add loading state
};

const doctorRecentPatients = createSlice({
    name: 'doctor-appointments',
    initialState,
    reducers: {
        setDoctorAppointments: (state, action) => {
            const {
                appointmentsHistory,
                upcomingAppointments,
                completedAppointments,
                unreadMessages
            } = action.payload;
            state.appointmentsHistory = appointmentsHistory || [];
            state.upcomingAppointments = upcomingAppointments || '';
            state.completedAppointments = completedAppointments || '';
            state.unreadMessages = unreadMessages || '';
            state.isLoading = false; // Set loading to false when data is loaded
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload; // Control loading state explicitly
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
                    ...action.payload.data
                };
            }
        },
        clearDoctorAppointment: () => {
            return {
                ...initialState
            };
        }
    }
});

export const {
    setDoctorAppointments,
    setLoading,
    addDoctorAppointment,
    deleteDoctorAppointment,
    updateDoctorAppointment,
    clearDoctorAppointment
} = doctorRecentPatients.actions;
export default doctorRecentPatients.reducer;
