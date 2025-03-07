import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
    data: []
};

const patientAppointments = createSlice({
    name: 'DoctorData',
    initialState,
    reducers: {
        setSearchDoctors(state, action) {
            state.data = action.payload.data;
            state.count = action.payload.count;
        },

        clearSearchDoctor(state) {
            state.data = [];
            state.count = 0;
        }
    }
});

export const { setSearchDoctors, clearSearchDoctor } =
    patientAppointments.actions;

export default patientAppointments.reducer;
