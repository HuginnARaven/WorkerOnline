import {createSlice} from '@reduxjs/toolkit'
import {applyAutoAppointment, getAutoAppointment} from "./autoAppointmentAction";

export const autoAppointmentSlice = createSlice({
    name: 'auto-appointment',
    initialState: {
        tasks: [],
        workers: [],
        previous_appointments: [],
        new_appointments: {
            assigned_tasks: [],
            steps: [],
        },
        errorMsg: null,
        is_loading: false,
    },
    reducers: {
        SetError: (state, action) => {
            state.errorMsg = action.payload
        },
        SetAutoAppointment: (state, action) => {
            state.tasks = action.payload.tasks || []
            state.workers = action.payload.workers || []
            state.previous_appointments = action.payload.previous_appointments || []
            state.new_appointments.assigned_tasks = action.payload.new_appointments.assigned_tasks || []
            state.new_appointments.steps = action.payload.new_appointments.steps || []
        },
    },
    extraReducers: builder => {
        builder.addCase(getAutoAppointment.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getAutoAppointment.fulfilled, (state, action) => {
            state.is_loading = false;
        });
        // builder.addCase(applyAutoAppointment.pending, (state, action) => {
        //     state.is_loading = true;
        // });
        // builder.addCase(applyAutoAppointment.fulfilled, (state, action) => {
        //     state.is_loading = false;
        // });
    }
})

export const {SetAutoAppointment, SetError} = autoAppointmentSlice.actions

export default autoAppointmentSlice.reducer