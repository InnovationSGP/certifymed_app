import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    upcomingAppointments: '',
    completedAppointments: '',
    cancelledAppointments: '',
    appointmentsHistory: [],
    isLoading: true // Add loading state
};

const patientAppointmentsSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        setAppointmentsForPatients: (state, action) => {
            state.appointmentsHistory = action.payload.appointmentsHistory;
            state.upcomingAppointments = action.payload.upcomingAppointments;
            state.completedAppointments = action.payload.completedAppointments;
            state.cancelledAppointments = action.payload.cancelledAppointments;
            state.isLoading = false; // Set loading to false when data is loaded
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload; // Control loading state explicitly
        },
        addAppointment: (state, action) => {
            state.appointmentsHistory.push(action.payload);
        },
        deleteAppointment: (state, action) => {
            state.appointmentsHistory = state.appointmentsHistory.filter(
                (appointment) => appointment.id !== action.payload
            );
        },
        updateAppointment: (state, action) => {
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
        clearAppointments: () => {
            return {
                ...initialState,
                isLoading: true // Reset to loading when clearing
            };
        }
    }
});

export const {
    setAppointmentsForPatients,
    setLoading,
    addAppointment,
    deleteAppointment,
    updateAppointment,
    clearAppointments
} = patientAppointmentsSlice.actions;
export default patientAppointmentsSlice.reducer;
